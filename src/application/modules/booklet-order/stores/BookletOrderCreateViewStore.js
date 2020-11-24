import { action, observable, computed } from 'mobx';
import { BookletOrderCreateForm } from 'application/booklet-order/forms';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class BookletOrderCreateViewStore extends BaseEditViewStore {
    @observable denominationTypes = [];
    @observable deliveryMethodTypes = [];
    @observable bookletTypes = [];
    @observable orderContents = [];
    @observable donor = null;
    @observable showMoreOptions = false;
    @observable showCustomizeBooks = false;
    applicationDefaultSetting = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet-order-create',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        await this.rootStore.application.bookletOrder.bookletOrderStore.create({
                            donorId: this.donorId,
                            checkOrderUrl: `${window.location.origin}/app/booklet-orders/?confirmationNumber={confirmationNumber}`,
                            ...resource,
                            bookletOrderContents: this.orderContents.filter(c => c.bookletCount > 0)
                        });
                    }
                }
            },
            FormClass: BookletOrderCreateForm,
        });

        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.donorId = rootStore.routerStore.routerState.params.id;
        }
        else {
            this.donorId = rootStore.userStore.user.id;
        }
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonor(),
                this.loadLookups()
            ]);

            if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
                if (!this.donor.isInitialContributionDone) {
                    this.rootStore.notificationStore.warning('BOOKLET_ORDER.CREATE.MISSING_INITIAL_CONTRIBUTION');
                    this.rootStore.routerStore.goTo('master.app.main.contribution.create', { id: this.donorId });
                }
            }

            this.setDefaultShippingAddress();
        }
    }

    @computed get totalAmount() {
        return this.mixed500BookletAmount + this.mixed2000BookletAmount + this.classicBookletAmount;
    }

    @computed get mixed500BookletAmount() {
        let amount = 0;
        if (this.orderContents.length > 0) {
            const mixed500BookletTypeId = this.bookletTypes.find(c => c.abrv === 'mixed_500').id;
            if (this.orderContents.some(c => c.bookletTypeId === mixed500BookletTypeId)) {
                const order = this.orderContents.find(c => c.bookletTypeId === mixed500BookletTypeId)
                amount += 500 * order.bookletCount;
            }
        }

        return amount;
    }

    @computed get mixed2000BookletAmount() {
        let amount = 0;
        if (this.orderContents.length > 0) {
            const mixed2000BookletTypeId = this.bookletTypes.find(c => c.abrv === 'mixed_2000').id;
            if (this.orderContents.some(c => c.bookletTypeId === mixed2000BookletTypeId)) {
                const order = this.orderContents.find(c => c.bookletTypeId === mixed2000BookletTypeId)
                amount += 2000 * order.bookletCount;
            }
        }

        return amount;
    }

    @computed get classicBookletAmount() {
        if (this.orderContents.length > 0) {
            let total = 0;
            const classicBookletTypeId = this.bookletTypes.find(c => c.abrv === 'classic').id;
            this.orderContents.filter(c => c.bookletTypeId === classicBookletTypeId).forEach(order => {
                total += this.denominationTypes.find(dt => dt.id === order.denominationTypeId).value * order.bookletCount * 50
            });
            return total;
        }
        return 0;
    }

    @action.bound
    async onRemoveBookletClick(bookletTypeId, denominationTypeId) {
        if (this.orderContents.length === 0 || !this.orderContents.some(c => c.bookletTypeId === bookletTypeId && c.denominationTypeId === denominationTypeId)) {
            return;
        }

        const index = this.orderContents.findIndex(c => c.bookletTypeId === bookletTypeId && c.denominationTypeId === denominationTypeId)
        if (this.orderContents[index].bookletCount === 0) {
            return;
        }
        this.orderContents[index] = { ...this.orderContents[index], bookletCount: this.orderContents[index].bookletCount - 1 };
    }

    @action.bound
    async onAddBookletClick(bookletTypeId, denominationTypeId) {
        if (this.orderContents.length === 0 || !this.orderContents.some(c => c.bookletTypeId === bookletTypeId && c.denominationTypeId === denominationTypeId)) {
            this.orderContents.push({
                bookletTypeId: bookletTypeId,
                bookletCount: 0,
                denominationTypeId: denominationTypeId
            })
        }

        const index = this.orderContents.findIndex(c => c.bookletTypeId === bookletTypeId && c.denominationTypeId === denominationTypeId)
        this.orderContents[index] = { ...this.orderContents[index], bookletCount: this.orderContents[index].bookletCount + 1 };
    }

    @action.bound
    async onCustomizeYourBooksChange() {
        if (this.form.$('isCustomizedBook').value) {
            this.form.$('customizedName').setDisabled(false);
        }
        else {
            this.form.$('customizedName').set('');
            this.form.$('customizedName').setDisabled(true);
        }
    }

    @action.bound
    async onChangeShippingAddressClick(setDefault) {
        this.form.$('addressLine1').setDisabled(setDefault);
        this.form.$('addressLine2').setDisabled(setDefault);
        this.form.$('city').setDisabled(setDefault);
        this.form.$('state').setDisabled(setDefault);
        this.form.$('zipCode').setDisabled(setDefault);

        if (setDefault) {
            this.setDefaultShippingAddress();
        }
    }

    @action.bound
    async onShowMoreOptionsClick() {
        this.showMoreOptions = !this.showMoreOptions;
    }

    @action.bound
    async onShowCustomizeBooksClick() {
        this.showCustomizeBooks = !this.showCustomizeBooks;
    }

    setDefaultShippingAddress() {
        this.form.$('addressLine1').set(this.donor.donorAddress.addressLine1);
        this.form.$('addressLine2').set(this.donor.donorAddress.addressLine2);
        this.form.$('city').set(this.donor.donorAddress.city);
        this.form.$('state').set(this.donor.donorAddress.state);
        this.form.$('zipCode').set(this.donor.donorAddress.zipCode);
    }

    async fetchDonor() {
        this.donor = await this.rootStore.application.bookletOrder.bookletOrderStore.getDonorInformation(this.donorId);
    }

    async loadLookups() {
        this.applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find();
        this.denominationTypes = await this.rootStore.application.lookup.denominationTypeStore.find();
        this.deliveryMethodTypes = await this.rootStore.application.lookup.deliveryMethodTypeStore.find();
        this.bookletTypes = await this.rootStore.application.lookup.bookletTypeStore.find();
    }
}

export default BookletOrderCreateViewStore;

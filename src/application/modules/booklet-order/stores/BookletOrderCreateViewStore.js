import { action, observable, computed } from 'mobx';
import { BookletOrderCreateForm } from 'application/booklet-order/forms';
import { BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { LookupService } from 'common/services';
import { BookletOrderService } from 'application/booklet-order/services';

@applicationContext
class BookletOrderCreateViewStore extends BaseEditViewStore {
    @observable denominationTypes = [];
    @observable deliveryMethodTypes = [];
    @observable bookletTypes = [];
    @observable orderContents = [];
    @observable donor = null;
    applicationDefaultSetting = null;

    constructor(rootStore) {
        super(rootStore, {
            name: 'booklet-order-create',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async (resource) => {

                        const response = await this.service.create({
                            donorId: this.donorId,
                            checkOrderUrl: `${window.location.origin}/app/booklet-orders/?confirmationNumber={confirmationNumber}`,
                            ...resource,
                            bookletOrderContents: this.orderContents.filter(c => c.bookletCount > 0)
                        });
                        return response;
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

        this.service = new BookletOrderService(rootStore.application.baasic.apiClient);
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonor(),
                this.fetchApplicationDefaultSetting(),
                this.fetchDenominationTypes(),
                this.fetchDeliveryMethodTypes(),
                this.fetchBookletTypes()
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
        return this.mixedBookletAmount + this.classicBookletAmount;
    }

    @computed get mixedBookletAmount() {
        if (this.orderContents.length > 0) {
            const mixedBookletTypeId = this.bookletTypes.find(c => c.abrv === 'mixed').id
            if (this.orderContents.some(c => c.bookletTypeId === mixedBookletTypeId)) {
                const order = this.orderContents.find(c => c.bookletTypeId === mixedBookletTypeId)
                const denominationType1 = this.denominationTypes.find(c => c.value === 1);
                const denominationType2 = this.denominationTypes.find(c => c.value === 2);
                const denominationType3 = this.denominationTypes.find(c => c.value === 3);

                const oneBookletValue = denominationType1.value * 20 + denominationType2.value * 20 + denominationType3.value * 10;
                return oneBookletValue * order.bookletCount;
            }
        }

        return 0;
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
    async setDefaultShippingAddress() {
        this.form.$('addressLine1').set(this.donor.donorAddress.addressLine1);
        this.form.$('addressLine2').set(this.donor.donorAddress.addressLine2);
        this.form.$('city').set(this.donor.donorAddress.city);
        this.form.$('state').set(this.donor.donorAddress.state);
        this.form.$('zipCode').set(this.donor.donorAddress.zipCode);
    }

    @action.bound
    async fetchDonor() {
        const response = await this.service.getDonorInformation(this.donorId);
        this.donor = response.data;
    }

    @action.bound
    async fetchApplicationDefaultSetting() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'application-default-setting');
        const response = await service.getAll();
        this.applicationDefaultSetting = response.data[0];
    }

    @action.bound
    async fetchDenominationTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'denomination-type');
        const response = await service.getAll();
        this.denominationTypes = response.data;
    }

    @action.bound
    async fetchDeliveryMethodTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'delivery-method-type');
        const response = await service.getAll();
        this.deliveryMethodTypes = response.data;
    }

    @action.bound
    async fetchBookletTypes() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'booklet-type');
        const response = await service.getAll();
        this.bookletTypes = response.data;
    }
}

export default BookletOrderCreateViewStore;

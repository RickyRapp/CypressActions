import { action, observable, computed } from 'mobx';
import { BookletOrderCreateForm } from 'application/common/booklet-order/forms';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import moment from 'moment';
import { ModalParams } from 'core/models';
import { DonorAutomaticContributionSettingForm } from 'application/donor/donor/forms';

const ErrorType = {
    InsufficientFunds: 0
};

@applicationContext
class BookletOrderCreateViewStore extends BaseEditViewStore {
    @observable denominationTypes = [];
    @observable deliveryMethodTypes = [];
    @observable bookletTypes = [];
    @observable orderContents = [];
    @observable donor = null;
    @observable showMoreOptions = false;
    @observable isDefaultShippingAddress = true;
    applicationDefaultSetting = null;

    constructor(rootStore, { donorId, isDonor }) {
        super(rootStore, {
            name: 'booklet-order-create',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        await this.rootStore.application.donor.bookletOrderStore.createBookletOrder({
                            donorId: this.donorId,
                            checkOrderUrl: `${window.location.origin}/app/booklet-orders/?confirmationNumber={confirmationNumber}`,
                            ...resource,
                            bookletOrderContents: this.orderContents.filter(c => c.bookletCount > 0)
                        });
                    }
                }
            },
            FormClass: BookletOrderCreateForm,
            errorActions: {
                onCreateError: ({ type, error }) => {
                    switch (type) {
                        case ErrorType.InsufficientFunds:
                            rootStore.notificationStore.error('USER.CREATE.USER_CREATE_ERROR', error);
                            break;
                        default:
                            rootStore.notificationStore.success('EDIT_FORM_LAYOUT.ERROR_CREATE');
                            break;
                    }
                }
            },
        });

        this.donorId = donorId;
        this.isDonor = isDonor;
        this.protectionPlanModalParams = new ModalParams({})
        this.createCustomizedExpirationDateDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.loadDonor(),
                this.loadLookups()
            ]);

            this.setDefaultShippingAddress();
        }
    }

    @action.bound
    onShowAllBooksClick() {
        if (this.isDonor) {
            this.rootStore.routerStore.goTo('master.app.main.donor.booklet-order.list')
        }
        else {
            this.rootStore.routerStore.goTo('master.app.main.administration.booklet-order.list', null, { id: this.donorId })
        }
    }

    @computed get totalAmount() {
        return this.mixed500BookletAmount + this.mixed2000BookletAmount + this.classicBookletAmount;
    }

    @computed get mixed500BookletAmount() {
        let amount = 0;
        if (this.orderContents.length > 0) {
            const mixed500BookletType = this.bookletTypes.find(c => c.abrv === 'mixed_500');
            if (mixed500BookletType) {
                if (this.orderContents.some(c => c.bookletTypeId === mixed500BookletType.id)) {
                    const order = this.orderContents.find(c => c.bookletTypeId === mixed500BookletType.id)
                    amount += 500 * order.bookletCount;
                }
            }
        }

        return amount;
    }

    @computed get mixed2000BookletAmount() {
        let amount = 0;
        if (this.orderContents.length > 0) {
            const mixed2000BookletType = this.bookletTypes.find(c => c.abrv === 'mixed_2000');
            if (mixed2000BookletType) {
                if (this.orderContents.some(c => c.bookletTypeId === mixed2000BookletType.id)) {
                    const order = this.orderContents.find(c => c.bookletTypeId === mixed2000BookletType.id)
                    amount += 2000 * order.bookletCount;
                }
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
    async onAddProtectionPlanClick() {
        const form = new DonorAutomaticContributionSettingForm({
            onSuccess: async () => {
                if (this.isDonor) {
                    await this.rootStore.application.donor.donorStore.createAutomaticContributionSetting({ donorId: this.donorId, ...form.values() });
                }
                else {
                    await this.rootStore.application.administration.donorStore.createAutomaticContributionSetting({ donorId: this.donorId, ...form.values() });
                }
                this.protectionPlanModalParams.close();
                await this.loadDonor();
            }
        });
        form.$('isEnabled').set(true);
        const bankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    let params = {
                        donorId: this.donorId,
                        orderBy: 'dateCreated',
                        orderDirection: 'desc'
                    }
                    if (this.isDonor) {
                        const data = await this.rootStore.application.donor.donorStore.findBankAccount(params);
                        return data.item;
                    }
                    else {
                        const data = await this.rootStore.application.administration.donorStore.findBankAccount(params);
                        return data.item;
                    }
                }
            });
        this.protectionPlanModalParams.open({
            form: form,
            bankAccountDropdownStore: bankAccountDropdownStore
        })
    }

    @action.bound
    async onChangeShippingAddressClick() {
        this.isDefaultShippingAddress = !this.isDefaultShippingAddress;

        this.form.$('addressLine1').setDisabled(this.isDefaultShippingAddress);
        this.form.$('addressLine2').setDisabled(this.isDefaultShippingAddress);
        this.form.$('city').setDisabled(this.isDefaultShippingAddress);
        this.form.$('state').setDisabled(this.isDefaultShippingAddress);
        this.form.$('zipCode').setDisabled(this.isDefaultShippingAddress);

        if (this.isDefaultShippingAddress) {
            this.setDefaultShippingAddress();
        }
        else {
            this.form.$('addressLine1').clear();
            this.form.$('addressLine2').clear();
            this.form.$('city').clear();
            this.form.$('state').clear();
            this.form.$('zipCode').clear();
        }
    }

    @action.bound
    async onShowMoreOptionsClick() {
        this.showMoreOptions = !this.showMoreOptions;
    }

    setDefaultShippingAddress() {
        this.form.$('addressLine1').set(this.donor.donorAddress.addressLine1);
        this.form.$('addressLine2').set(this.donor.donorAddress.addressLine2);
        this.form.$('city').set(this.donor.donorAddress.city);
        this.form.$('state').set(this.donor.donorAddress.state);
        this.form.$('zipCode').set(this.donor.donorAddress.zipCode);
    }

    async loadDonor() {
        if (this.isDonor) {
            this.donor = await this.rootStore.application.donor.bookletOrderStore.getDonorInformation(this.donorId);
        }
        else {
            this.donor = await this.rootStore.application.administration.bookletOrderStore.getDonorInformation(this.donorId);
        }
    }

    async loadLookups() {
        this.applicationDefaultSetting = await this.rootStore.application.lookup.applicationDefaultSettingStore.find();
        this.denominationTypes = (await this.rootStore.application.lookup.denominationTypeStore.find()).filter(c => c.value !== 15);
        this.deliveryMethodTypes = await this.rootStore.application.lookup.deliveryMethodTypeStore.find();
        this.bookletTypes = (await this.rootStore.application.lookup.bookletTypeStore.find()).filter(c => c.abrv === 'classic');
    }

    createCustomizedExpirationDateDropdownStore() {
        this.customizedExpirationDateDropdownStore = new BaasicDropdownStore(
            {
                clearable: true
            },
            {
                fetchFunc: async () => {
                    return [
                        { id: '1', name: '90 days' },
                        { id: '2', name: '180 days' },
                        { id: '3', name: '365 days' }]
                }
            });
    }
}

export default BookletOrderCreateViewStore;

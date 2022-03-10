import { action, observable, computed } from 'mobx';
import { BookletOrderCreateForm } from 'application/common/booklet-order/forms';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
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
    @observable totalPrePaidBooks = 0;
    @observable showMoreOptions = false;
    @observable showAddOnitems = false;
    @observable isDefaultShippingAddress = true;
    @observable tableData = [];
    applicationDefaultSetting = null;
    @observable validForm = true;
    blankDenomination = null;

    constructor(rootStore, { donorId, isDonor }) {
        super(rootStore, {
            name: 'booklet-order-create',
            id: undefined,
            actions: () => {
                return {
                    create: async (resource) => {
                        // if(!this.donor.hasProtectionPlan && (this.totalAmount - this.totalPrepaidAmount > 0) && (this.donor.presentBalance + this.donor.lineOfCredit) < this.totalAmount) {
                        //     this.rootStore.notificationStore.error('Insufficient funds, please enroll in protection plan or deposit funds');
                        //     this.form.invalidate('Insufficient funds');
                        //     this.validForm = false;
                        //     return;
                        // }
                        // if(this.totalPrepaidAmount > (this.donor.presentBalance + this.donor.lineOfCredit)) {
                        //     this.rootStore.notificationStore.error('Insufficient funds, please deposit funds');
                        //     this.form.invalidate('Insufficient funds');
                        //     this.validForm = false;
                        //     return;
                        // }
                        const data = await this.rootStore.application.donor.bookletOrderStore.createBookletOrder({
                            donorId: this.donorId,
                            checkOrderUrl: `${window.location.origin}/app/booklet-orders/?confirmationNumber={confirmationNumber}`,
                            ...resource,
                            bookletOrderContents: this.orderContents.filter(c => c.bookletCount > 0)
                        });
                        this.id = data.response;
                    }
                }
            },
            onAfterAction: () => {
                if(this.validForm) {
                    if(rootStore.userStore.user.roles.includes('Users'))
                        rootStore.routerStore.goTo('master.app.main.donor.booklet-order.details', { id: this.id });
                    else 
                        rootStore.routerStore.goTo('master.app.main.administration.booklet-order.details', { id: this.id });
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
                            rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_CREATE');
                            break;
                    }
                }
            },
        });

        this.donorId = donorId;
        this.isDonor = isDonor;
        this.isAdmin = rootStore.userStore.applicationUser.roles.includes('Administrators');
        this.protectionPlanModalParams = new ModalParams({})
        this.createConfirmModalParams();
        this.createCustomizedExpirationDateDropdownStore();
    }

    createConfirmModalParams() {
		this.confirmModal = new ModalParams({});
	}

    //#region MODAL
	@action.bound
	async onSubmitClick(bookletAmount) {
        this.confirmModal.open({
            onCancel: () => {
                this.confirmModal.close();
            },
            bookletAmount: bookletAmount
		})
	}
	//#endregion
    @action.bound
    async click500(){
        this.onSubmitClick(500);
    }
    @action.bound
    async click2000(){
        this.onSubmitClick(2000);
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
        console.log(this.rootStore);
        this.blankDenomination = (await this.rootStore.application.lookup.denominationTypeStore.find()).find(x => x.abrv == 'blank');
    }

    @action.bound
    goToNewDeposit() {
        if(this.isAdmin)
            this.rootStore.routerStore.goTo('master.app.main.administration.contribution.create', {id: this.donorId});
        else
            this.rootStore.routerStore.goTo('master.app.main.donor.contribution.create');
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

    @action.bound
    onShowBookletsClick() {
        if (this.isDonor) {
            this.rootStore.routerStore.goTo('master.app.main.donor.booklet.list')
        }
        else {
            this.rootStore.routerStore.goTo('master.app.main.administration.booklet.list')
        }
    }

    @computed get totalAmount() {
        return this.mixed500BookletAmount + this.mixed2000BookletAmount + this.classicBookletAmount + (this.donor && !this.donor.isSessionFeePayedByCharity && parseFloat((this.totalPrepaidAmount * 0.029).toFixed(2))) + ((this.form.$('customizedName').value && this.form.$('customizedName').value.length > 0) || (this.form.$('customizedAddressLine1').value && this.form.$('customizedAddressLine1').value.length > 0) ? this.donor && this.donor.accountType && this.donor.accountType.abrv != 'private' && parseFloat(this.customizedFee) : 0) + ((this.deliveryMethodTypes && this.deliveryMethodTypes.length > 0 && this.deliveryMethodTypes.find(x => x.abrv === 'express-mail').id == this.form.$('deliveryMethodTypeId').value) ? 25 : 0);
    }
    
    @computed get customizedFee() {
        return this.orderContents.reduce((a,b) => a+b.bookletCount, 0)*5;
    }

    @computed get totalPrepaidAmount() {
        return this.prepaidBookletAmount;
    }

    @computed get prepaidBooksChecks() {
        
            if (this.totalPrePaidBooks > 0) {
                return this.prepaidBooksContribution < this.totalPrePaidBooks && this.donor.availableBalance < this.totalAmount;
            } else {
                return false;
            }
    }

    @computed get prepaidBooksContribution() {
        if (this.donor) {
            if (this.donor.contribution) {
                return this.donor.contribution.map(a => a.amount).reduce((a, b) => a + b, 0) + this.donor.lineOfCredit;
            } else {
                return 0;
            }
        }
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

    @computed get prepaidBookletAmount() {
        if (this.orderContents.length > 0) {
            let total = 0;
            const classicBookletTypeId = this.bookletTypes.find(c => c.abrv === 'classic').id;
            this.orderContents.filter(c => c.bookletTypeId === classicBookletTypeId).forEach(order => {
                const dtvalue = this.denominationTypes.find(dt => dt.id === order.denominationTypeId).value;
                total += dtvalue === 1 || dtvalue === 2 || dtvalue === 3 || dtvalue === 5 ? dtvalue * order.bookletCount * 50 : 0
            });
            return total;
        }
        return 0;
    }

    generateTableData(order, index) {
        const isMixed = order.bookletTypeId === this.bookletTypes.find(c => c.abrv === 'mixed_500').id || order.bookletTypeId === this.bookletTypes.find(c => c.abrv === 'mixed_2000').id;
        let bookletAmount = order ? (isMixed ? index * order.bookletCount : index * order.bookletCount * 50) : 0;
        if (this.tableData.length > 0) {
            const foundIndex = this.tableData.findIndex(x => x.id === index);
            if (foundIndex != -1) {
                this.tableData[foundIndex] = { ...this.tableData[foundIndex], count: order.bookletCount, amount: bookletAmount }
                return this.tableData;
            }
        }
        return this.tableData.push({ id: index, count: order.bookletCount, amount: bookletAmount });
    }

    @action.bound
    async onRemoveBookletClick(bookletTypeId, denominationTypeId) {
        //eslint-disable-next-line
        let dtvalue = this.denominationTypes.find(dt => dt.id === denominationTypeId).value;
        if (this.orderContents.length === 0 || !this.orderContents.some(c => c.bookletTypeId === bookletTypeId && c.denominationTypeId === denominationTypeId)) {
            return;
        }

        const index = this.orderContents.findIndex(c => c.bookletTypeId === bookletTypeId && c.denominationTypeId === denominationTypeId)
        if (this.orderContents[index].bookletCount === 0) {
            return;
        }
        this.orderContents[index] = { ...this.orderContents[index], bookletCount: this.orderContents[index].bookletCount - 1 };
        const classicBookletTypeId = this.bookletTypes.find(c => c.abrv === 'classic').id;
        if(bookletTypeId === classicBookletTypeId) {
            let dt = (await this.rootStore.application.lookup.denominationTypeStore.find()).filter(c => c.id === denominationTypeId)[0];
            if (dt.value === 1 || dt.value === 2 || dt.value === 3 || dt.value === 5)
                this.totalPrePaidBooks -= dt.value * 50;
        }
        this.generateTableData(this.orderContents[index], dtvalue);
    }

    @action.bound
    async onAddBookletClick(bookletTypeId, denominationTypeId) {
        let dtvalue = this.denominationTypes.find(dt => dt.id === denominationTypeId).value;
        
        if(this.orderContents.length > 0) {
            const index = this.orderContents.findIndex(c => c.bookletTypeId === bookletTypeId && c.denominationTypeId === denominationTypeId);
            if(typeof this.orderContents[index] !== 'undefined' && this.orderContents[index].bookletCount >= 100) {
                this.rootStore.notificationStore.error('Booklet count must be between 1 and 100');
                return;
            }
        }
        if (this.orderContents.length === 0 || !this.orderContents.some(c => c.bookletTypeId === bookletTypeId && c.denominationTypeId === denominationTypeId)) {
            this.orderContents.push({
                bookletTypeId: bookletTypeId,
                bookletCount: 0,
                denominationTypeId: denominationTypeId
            })
        }

        const index = this.orderContents.findIndex(c => c.bookletTypeId === bookletTypeId && c.denominationTypeId === denominationTypeId)
        this.orderContents[index] = { ...this.orderContents[index], bookletCount: this.orderContents[index].bookletCount + 1 };
        const classicBookletTypeId = this.bookletTypes.find(c => c.abrv === 'classic').id;
        if(bookletTypeId === classicBookletTypeId) {
            let dt = (await this.rootStore.application.lookup.denominationTypeStore.find()).filter(c => c.id === denominationTypeId)[0];
            if (dt.value === 1 || dt.value === 2 || dt.value === 3 || dt.value === 5)
                this.totalPrePaidBooks += dt.value * 50;
        }
        this.generateTableData(this.orderContents[index], dtvalue);
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

        this.form.$('shippingAddressLine1').setDisabled(this.isDefaultShippingAddress);
        this.form.$('shippingAddressLine2').setDisabled(this.isDefaultShippingAddress);
        this.form.$('shippingCity').setDisabled(this.isDefaultShippingAddress);
        this.form.$('shippingState').setDisabled(this.isDefaultShippingAddress);
        this.form.$('shippingZipCode').setDisabled(this.isDefaultShippingAddress);

        if (this.isDefaultShippingAddress) {
            this.setDefaultShippingAddress();
        }
        else {
            this.form.$('shippingAddressLine1').clear();
            this.form.$('shippingAddressLine2').clear();
            this.form.$('shippingCity').clear();
            this.form.$('shippingState').clear();
            this.form.$('shippingZipCode').clear();
        }
    }

    @action.bound
    async onShowMoreOptionsClick() {
        this.showMoreOptions = !this.showMoreOptions;
    }

    @action.bound
    async onShowAddOnItemsClick() {
        this.showAddOnitems = !this.showAddOnitems;
    }

    setDefaultShippingAddress() {
        this.form.$('shippingAddressLine1').set(this.donor.donorAddress.addressLine1);
        this.form.$('shippingAddressLine2').set(this.donor.donorAddress.addressLine2);
        this.form.$('shippingCity').set(this.donor.donorAddress.city);
        this.form.$('shippingState').set(this.donor.donorAddress.state);
        this.form.$('shippingZipCode').set(this.donor.donorAddress.zipCode);
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
        this.bookletTypes = (await this.rootStore.application.lookup.bookletTypeStore.find());
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

    @computed get needsProtectionPlan() {
        const blanks = this.orderContents.filter(x => x.denominationTypeId == this.blankDenomination.id);
        return ((blanks.length > 0 && blanks[0].bookletCount > 0) || ((this.mixed500BookletAmount + this.mixed2000BookletAmount + this.classicBookletAmount) - this.totalPrepaidAmount) > 0) && this.donor && !this.donor.hasProtectionPlan;
    }
    @computed get needsMoreFunds() {
        let shipping = (this.deliveryMethodTypes && this.form.$('deliveryMethodTypeId').value && this.deliveryMethodTypes.find(x => x.abrv === 'express-mail').id == this.form.$('deliveryMethodTypeId').value) ? 25 : 0;
        let fees = parseFloat(this.donor && !this.donor.isSessionFeePayedByCharity ? this.totalPrepaidAmount * 0.029 : 0) + parseFloat(shipping); //TODO: Add customization fee
        if(this.donor) {
            const totalContributionsUpcoming = this.donor.contribution.map(item => item.amount).reduce((a, b) => a + b, 0);
            if((this.totalPrepaidAmount + fees) == 0)
                return false; 
            return ((this.totalPrepaidAmount + fees) > (this.donor.availableBalance + this.donor.lineOfCredit + totalContributionsUpcoming));
        }
        return false;
    }
}

export default BookletOrderCreateViewStore;

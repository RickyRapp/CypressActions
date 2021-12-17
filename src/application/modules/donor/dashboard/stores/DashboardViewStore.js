import { DonorGivingCardActivationForm, DonorGivingGoalsForm } from 'application/donor/donor/forms';
import { ModalParams } from 'core/models';
import { localStorageProvider } from 'core/providers';
import { BaasicDropdownStore, BaseViewStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
@applicationContext
class DashboardViewStore extends BaseViewStore {
    @observable donor = null;
    @observable yearlyGoal = null;
    @observable oneTimeGoal = null;
    @observable yearly = 0;
    @observable oneTime = 0;
    @observable oneTimeToGive = 0;
    @observable percentageYear = 1;
    @observable percentageMonth = 1;
    @observable showMoreOptions = false;

    constructor(rootStore) {
        super(rootStore);

        this.createYearDropdownStore();
        this.createBankAccountDropdownStore();
        this.activateCardModalParams = new ModalParams({});;
        this.givingGoalsModalParams = new ModalParams({});

        this.donorId = rootStore.userStore.applicationUser.id;

        this.createTableStore();
    }
    @action.bound 
    async createOneTimeIncomeTable(){
        localStorageProvider.add('totalGoal', parseFloat(this.oneTimeToGive + (this.yearly * (this.percentageYear / 100))))
        const resp = await this.rootStore.application.donor.donorStore.donorGivingGoalService.find({ donorId: this.donorId });

        this.tableStore.setData(resp.data.item.filter(x => x.incomeTypeId === this.incomeType.find(x => x.abrv === 'one-time').id && (new Date(x.dateCreated)).getFullYear() == (new Date()).getFullYear()));
        if (!this.tableStore.dataInitialized) {
            this.tableStore.dataInitialized = true;
        }
        this.oneTimeGoal = resp.data.item.filter(x => x.incomeTypeId === this.incomeType.find(x => x.abrv === 'one-time').id && (new Date(x.dateCreated)).getFullYear() == (new Date()).getFullYear());
        this.oneTimeToGive = this.oneTimeGoal.length > 0 ? this.oneTimeGoal.map(item => (item.amount * (item.percentage/100))).reduce((a, b) => a + b) : 0;
    }
    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchDonorData()
            ]);
            this.incomeType = await this.rootStore.application.lookup.incomeTypeStore.find();

            const resp = await this.rootStore.application.donor.donorStore.donorGivingGoalService.find({ donorId: this.donorId }); 
            
            try {
                this.oneTimeGoal = resp.data.item.filter(x => x.incomeTypeId === this.incomeType.find(x => x.abrv === 'one-time').id && (new Date(x.dateCreated)).getFullYear() == (new Date()).getFullYear());
                this.oneTime = this.oneTimeGoal.map(item => item.amount).reduce((a, b) => a + b);
                this.oneTimeToGive = this.oneTimeGoal.length ? this.oneTimeGoal.map(item => (item.amount * (item.percentage/100))).reduce((a, b) => a + b) : 0;
                if(this.oneTimeGoal.length == 1) {
                    this.percentageMonth = this.oneTimeGoal[0].percentage;
                }
            }
            //eslint-disable-next-line
            catch (e) {

            }

            try {
                this.yearlyGoal = resp.data.item.find(x => x.incomeTypeId === this.incomeType.find(x => x.abrv === 'yearly').id);
                this.yearly = this.yearlyGoal.amount;
                this.percentageYear = this.yearlyGoal.percentage;
            }
            //eslint-disable-next-line
            catch (e) {

            }
            this.createOneTimeIncomeTable();
        }
    }

    @action.bound
    async fetchDonorData() {
        const data = await this.rootStore.application.donor.dashboardStore.loadDashboardData(this.rootStore.userStore.applicationUser.id);
        let initialValue = new Date().getMonth() > 0 && new Date().getMonth() < 11 ? 2 : (new Date().getMonth() == 11 ? (new Date().getFullYear()) : 30);
        let initialName = new Date().getMonth() > 0 && new Date().getMonth() < 11 ? 'Year To Date' : (new Date().getMonth() == 11 ? (new Date().getFullYear()).toString() : 'This Month');
        if (data.donationsPerYear.length > 0) {
            let donations = data.donationsPerYear.map(c => { return { name: c.year.toString(), id: c.year } });
            //{ name: 'Last Week', id: -7 }
            let donationsSorted = [];
            donationsSorted.push({ name: 'This Week', id: 7 }, { name: 'This Month', id: 30 }, { name: 'Last Month', id: -30 }, { name: 'Year To Date', id: 2 });
            donations.forEach(element => {
                donationsSorted.push(element);
            });
            donationsSorted.push({ name: 'All Time', id: 1 });
            this.yearDropdownStore.setItems(donationsSorted);
            //this.yearDropdownStore.setItems(data.donationsPerYear.map(c => { return { name: c.year.toString(), id: c.year } }));
            //this.yearDropdownStore.setItems({name: 'Past Week', id: uuid()});
        }
        else {
            this.yearDropdownStore.setItems([{ name: initialName, id: initialValue }]);
        }
        this.yearDropdownStore.setValue({ name: (new Date().getFullYear()).toString(), id: new Date().getFullYear() });
        this.donor = data;
        this.yearDropdownStore.setValue({ name: 'Year To Date', id: 2 });
    }

    createYearDropdownStore() {
        this.yearDropdownStore = new BaasicDropdownStore();
    }

    @action.bound
    async newContributionOnClick() {
        this.rootStore.routerStore.goTo('master.app.main.donor.contribution.create');
    }

    @action.bound
    async newGrantOnClick() {
        this.rootStore.routerStore.goTo('master.app.main.donor.grant.create');
    }

    @action.bound
    onShowMoreOptionsClick() {
        this.showMoreOptions = !this.showMoreOptions;
    }

    @action.bound
    noGivingGoals() {
        this.showMoreOptions = true;
        const card = document.getElementById('giving-goals-card');
        card.scrollIntoView();
    }

    @action.bound
    async activateCardOnClick() {
        const form = new DonorGivingCardActivationForm({
            onSuccess: async (form) => {
                try {
                    await this.rootStore.application.donor.donorStore.activateGivingCard({ ...form.values(), donorId: this.rootStore.userStore.applicationUser.id });
                    this.donor.hasCardForActivation = false;
                    this.activateCardModalParams.close();
                    this.rootStore.notificationStore.success('DONOR_GIVING_CARD_SETTING.ACTIVATION.ERROR_MESSAGE.SUCCESS');
                } catch ({ statusCode, data }) {

                    switch (statusCode) {
                        case 404:
                            this.rootStore.notificationStore.error('DONOR_GIVING_CARD_SETTING.ACTIVATION.ERROR_MESSAGE.NOT_FOUND');
                            break;

                        default:
                            this.rootStore.notificationStore.error('DONOR_GIVING_CARD_SETTING.ACTIVATION.ERROR_MESSAGE.SOMETING_WENT_WRONG');
                            break;
                    }
                }
            }
        });
        this.activateCardModalParams.open({
            form: form
        })
    }

    @action.bound
    async orderBookletsOnClick() {
        this.rootStore.routerStore.goTo('master.app.main.donor.booklet-order.create');
    }

    @action.bound
    async newIncomeOnClick(isYearly = false) {
        const form = new DonorGivingGoalsForm({
            onSuccess: async (form) => {
                try {
                    await this.rootStore.application.donor.donorStore.donorGivingGoalService.create({ ...form.values(), donorId: this.rootStore.userStore.applicationUser.id })
                    this.givingGoalsModalParams.close();
                    if (isYearly) {
                        this.yearly = form.$('amount').value;
                        this.percentageYear = form.$('percentage').value;
                    } else {
                        this.oneTime = form.$('amount').value;
                        this.percentageMonth = form.$('percentage').value;
                    }

                    this.rootStore.notificationStore.success('Successfully added giving goal');
                    this.createOneTimeIncomeTable();
                } catch ({ statusCode, data }) {

                    switch (statusCode) {
                        case 404:
                            this.rootStore.notificationStore.error('Not found');
                            break;

                        default:
                            this.rootStore.notificationStore.error('Something went wrong');
                            break;
                    }
                }
            }
        });
        // if (this.bankAccountDropdownStore.items.length == 0)
        //     this.rootStore.notificationStore.error('You have no bank account, please create one');

        if (isYearly)
            form.$('isYearly').value = 'true';
        this.givingGoalsModalParams.open({ form: form, bankAccountDropdownStore: this.bankAccountDropdownStore });
    }

    @action.bound
    async editIncomeOnClick(goal) {
        const form = new DonorGivingGoalsForm({
            onSuccess: async (form) => {
                try {
                    await this.rootStore.application.donor.donorStore.donorGivingGoalService.update({ ...form.values(), donorId: this.rootStore.userStore.applicationUser.id, id: goal.id })

                    this.givingGoalsModalParams.close();

                    if (form.$('isYearly').value !== 'true') {
                        this.yearly = form.$('amount').value;
                        this.percentageYear = form.$('percentage').value;
                    } else {
                        this.oneTime = form.$('amount').value;
                        this.percentageMonth = form.$('percentage').value;
                    }

                    this.rootStore.notificationStore.success('Successfully updated giving goal');
                    this.createOneTimeIncomeTable();
                } catch ({ statusCode, data }) {

                    switch (statusCode) {
                        case 404:
                            this.rootStore.notificationStore.error('DONOR_GIVING_CARD_SETTING.ACTIVATION.ERROR_MESSAGE.NOT_FOUND');
                            break;

                        default:
                            this.rootStore.notificationStore.error('DONOR_GIVING_CARD_SETTING.ACTIVATION.ERROR_MESSAGE.SOMETING_WENT_WRONG');
                            break;
                    }
                }
            }
        });
        form.$('isYearly').value = (goal.incomeTypeId === this.incomeType.find(x => x.abrv === 'yearly').id).toString();
        form.$('amount').value = goal.amount;
        form.$('percentage').value = goal.percentage;
        form.$('note').value = goal.note;
        form.$('autoMonthlyContribution').value = goal.autoMonthlyContribution;
        form.$('autoDeduction').value = goal.autoDeduction;
        //form.$('donorBankAccountId').value = goal.donorBankAccountId;

        this.givingGoalsModalParams.open({ form: form }); //, bankAccountDropdownStore: this.bankAccountDropdownStore });
    }

    createBankAccountDropdownStore() {
        this.bankAccountDropdownStore = new BaasicDropdownStore({ initFetch: true },
            {
                fetchFunc: async () => {
                    try {
                        let params = {
                            donorId: this.rootStore.userStore.applicationUser.id,
                            orderBy: 'dateCreated',
                            orderDirection: 'desc'
                        }
                        const data = await this.rootStore.application.donor.donorStore.findBankAccount(params);
                        return data.item;
                    } catch (e) {
                        this.rootStore.notificationStore.error('Cannot fetch donor bank accounts');
                    }

                }
            });
    }
    createTableStore() {
        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'Date created',
                    format: {
						type: 'date',
						value: 'short',
					},
                },
                {
                    key: 'amount',
                    title: 'Income',
                    format: {
						type: 'currency',
						value: '$',
					},
                },
                {
                    key: 'percentage',
                    title: 'Percentage',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return `${item.percentage}%`; 
                        }
                    }
                },
                {
                    key: 'note',
                    title: 'Note'
                },
                {
                    key: 'amount',
                    title: 'Goal amount',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return `$${((item.percentage / 100) * item.amount).toFixed(2)}`;
                        }
                    }
                },
            ],
            actions: {
                onEdit: (column) => this.onEditGoal(column),
                onDelete: async (column) => await this.onDeleteGoal(column)
            },
        });
    }
    async onDeleteGoal(goal) {
        this.rootStore.modalStore.showConfirm('LIST_LAYOUT.CONFIRM_DELETE', async () => {
            try {
                await this.rootStore.application.donor.donorStore.donorGivingGoalService.delete({id: goal.id});
                this.rootStore.notificationStore.success('LIST_LAYOUT.SUCCESS_DELETE');
                this.createOneTimeIncomeTable();  
            } catch (err) {
                this.rootStore.notificationStore.error('LIST_LAYOUT.ERROR_DELETE', err);
            }
        });
    }
    onEditGoal(goal) {
        try {
            this.editIncomeOnClick(goal);
            this.createOneTimeIncomeTable();  
        } catch(e) {
            this.rootStore.notificationStore.error('Giving goal could not be edited');
        }
    }
}

export default DashboardViewStore;

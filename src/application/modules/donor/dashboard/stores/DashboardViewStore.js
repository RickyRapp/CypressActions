import { DonorGivingCardActivationForm } from 'application/donor/donor/forms';
import { ModalParams } from 'core/models';
import { BaasicDropdownStore, BaseViewStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';


@applicationContext
class DashboardViewStore extends BaseViewStore {
    @observable donor = null;

    constructor(rootStore) {
        super(rootStore);

        this.createYearDropdownStore();
        this.activateCardModalParams = new ModalParams({});;
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
        }
    }

    @action.bound
    async fetchDonorData() {
        const data = await this.rootStore.application.donor.dashboardStore.loadDashboardData(this.rootStore.userStore.applicationUser.id);
        let initialValue = new Date().getFullYear();
        if (data.donationsPerYear.length > 0) {
            this.yearDropdownStore.setItems(data.donationsPerYear.map(c => { return { name: c.year.toString(), id: c.year } }));
        }
        else {
            this.yearDropdownStore.setItems([{ name: initialValue.toString(), id: initialValue }]);
        }
        this.yearDropdownStore.setValue({ name: initialValue.toString(), id: initialValue });
        this.donor = data;
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

}

export default DashboardViewStore;

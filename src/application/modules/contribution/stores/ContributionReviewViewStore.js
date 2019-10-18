import { action, runInAction } from 'mobx';
import { ContributionReviewForm } from 'application/contribution/forms';
import { applicationContext } from 'core/utils';
import { ContributionService } from 'application/contribution/services';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { LookupService } from 'common/services';

@applicationContext
class ContributionReviewViewStore extends BaseEditViewStore {
    contributionStatuses = null;

    constructor(rootStore, id, onAfterReview) {
        const service = new ContributionService(rootStore.application.baasic.apiClient);
        super(rootStore, {
            name: 'contribution-review',
            id: id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        const response = await service.review({ ...resource });
                        onAfterReview();
                        return response;
                    },
                    get: async (id) => {
                        let params = {
                            embed: [
                                'contributionStatus',
                                'donorAccount',
                                'donorAccount.coreUser',
                                'donorAccount.companyProfile'
                            ],
                            fields: [
                                'id',
                                'contributionStatusId',
                                'contributionStatus',
                                'amount',
                                'donorAccount',
                                'donorAccount.donorName'
                            ]
                        };
                        let response = await service.get(id, params);
                        return response.data;
                    }
                }
            },
            FormClass: ContributionReviewForm,
            onAfterAction: onAfterReview
        });

        this.id = id;
        this.contributionStatusDropdownStore = new BaasicDropdownStore(null,
            {
                onChange: () => {
                    if (this.item.contributionStatus.abrv === 'pending' && this.contributionStatusDropdownStore.originalItems.length === 3) {
                        runInAction(() => {
                            this.contributionStatusDropdownStore.setItems(_.filter(this.contributionStatuses, function (status) { return status.abrv === 'in-process' || status.abrv === 'canceled' }));
                        });
                    }
                    else if (this.item.contributionStatus.abrv === 'in-process' && this.contributionStatusDropdownStore.originalItems.length === 3) {
                        runInAction(() => {
                            this.contributionStatusDropdownStore.setItems(_.filter(this.contributionStatuses, function (status) { return status.abrv === 'funded' || status.abrv === 'canceled' }));
                        });
                    }
                    else if (this.item.contributionStatus.abrv === 'funded' && this.contributionStatusDropdownStore.originalItems.length === 2) {
                        runInAction(() => {
                            this.contributionStatusDropdownStore.setItems(_.filter(this.contributionStatuses, function (status) { return status.abrv === 'declined' }));
                        });
                    }
                }
            });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.form.clear();
            await this.getResource(this.id)
            await this.fetchContributionStatuses();
        }
    }

    @action.bound
    getDefaults() {
        let availableStatuses = [];
        if (this.item.contributionStatus.abrv === 'pending') {
            availableStatuses.push(..._.filter(this.contributionStatuses, function (status) { return status.abrv === 'in-process' || status.abrv === 'canceled' || status.abrv === 'pending' }));
        }
        else if (this.item.contributionStatus.abrv === 'in-process') {
            availableStatuses.push(..._.filter(this.contributionStatuses, function (status) { return status.abrv === 'funded' || status.abrv === 'canceled' || status.abrv === 'in-process' }));
        }
        else if (this.item.contributionStatus.abrv === 'funded') {
            availableStatuses.push(..._.filter(this.contributionStatuses, function (status) { return status.abrv === 'declined' || status.abrv === 'funded' }));
        }
        return availableStatuses;
    }

    @action.bound
    async fetchContributionStatuses() {
        this.contributionStatusDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'contribution-status');
        const response = await service.getAll();
        this.contributionStatuses = response.data;
        const availableStatuses = this.getDefaults();
        runInAction(() => {
            this.contributionStatusDropdownStore.setItems(availableStatuses);
            this.contributionStatusDropdownStore.setLoading(false);
        });
    }
}

export default ContributionReviewViewStore;

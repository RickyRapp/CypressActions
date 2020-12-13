import { action, runInAction } from 'mobx';
import { ContributionReviewForm } from 'application/administration/contribution/forms';
import { applicationContext } from 'core/utils';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import _ from 'lodash';

@applicationContext
class ContributionReviewViewStore extends BaseEditViewStore {
    contributionStatuses = null;

    constructor(rootStore, id, onAfterReview) {
        super(rootStore, {
            name: 'contribution-review',
            id: id,
            autoInit: false,
            actions: () => {
                return {
                    update: async (resource) => {
                        await rootStore.application.administration.contributionStore.reviewContribution(resource);
                    },
                    get: async (id) => {
                        let params = {
                            embed: [
                                'contributionStatus',
                                'donor',
                                'donor.coreUser',
                                'donor.companyProfile'
                            ],
                            fields: [
                                'id',
                                'contributionStatusId',
                                'contributionStatus',
                                'amount',
                                'donor',
                                'donor.donorName'
                            ]
                        };
                        return rootStore.application.administration.contributionStore.getContribution(id, params);
                    }
                }
            },
            FormClass: ContributionReviewForm,
            onAfterAction: onAfterReview
        });

        this.id = id;

        this.createContributionDropdownStore();
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
        this.contributionStatuses = await this.rootStore.application.lookup.contributionStatusStore.find();;
        const availableStatuses = this.getDefaults();
        runInAction(() => {
            this.contributionStatusDropdownStore.setItems(availableStatuses);
            this.contributionStatusDropdownStore.setLoading(false);
        });
    }

    createContributionDropdownStore() {
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
}

export default ContributionReviewViewStore;

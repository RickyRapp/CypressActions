import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action } from 'mobx';
import { ContributionReviewListFilter } from '../models';

@applicationContext
class ContributionAchReviewListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'contribution-ach-review',
            routes: {},
            queryConfig: {
                filter: new ContributionReviewListFilter('dateCreated', 'desc')
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [];
                        return rootStore.application.administration.contributionStore.findContributionAchReviews(params);
                    }
                }
            }
        });

        this.createTableStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'achBatchNumber',
                    title: 'CHARITY.LIST.COLUMNS.NAME_LABEL'
                },
                {
                    key: 'dateCreated',
                    title: 'CHARITY.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'kendo-input-medium'
                    }
                },
                {
                    key: 'confirmationTime',
                    title: 'CHARITY.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'kendo-input-medium'
                    }
                },
                {
                    key: 'isConfirmed',
                    title: 'CHARITY.LIST.COLUMNS.BALANCE_LABEL'
                },
                {
                    key: 'isValid',
                    title: 'CHARITY.LIST.COLUMNS.BALANCE_LABEL'
                }
            ],
            actions: {
            },
            actionsRender:{
                
            }
        }));
    }
}

export default ContributionAchReviewListViewStore;

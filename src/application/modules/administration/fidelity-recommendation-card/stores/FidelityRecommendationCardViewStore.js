import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { FidelityRecommendationCardService } from 'application/administration/fidelity-recommendation-card/services';
import { applicationContext } from 'core/utils';
import { FidelityRecommendationCardListFilter } from 'application/administration/fidelity-recommendation-card/models';

@applicationContext
class FidelityRecommendationCardViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const service = new FidelityRecommendationCardService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'fidelity-recommendation-card',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
            },
            queryConfig: {
                filter: new FidelityRecommendationCardListFilter('dateCreated', 'desc'),
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'donorAccount',
                            'donorAccount.coreUser',
                            'donorAccount.companyProfile'
                        ];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.service = service;

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'cardNumber',
                    title: 'FIDELITY_RECOMMENDATION_CARD.LIST.COLUMNS.CARD_NUMBER_LABEL'
                },
                {
                    key: 'donorAccount.donorName',
                    title: 'FIDELITY_RECOMMENDATION_CARD.LIST.COLUMNS.DONOR_NAME_LABEL'
                },
                {
                    key: 'isLostOrStolen',
                    title: 'FIDELITY_RECOMMENDATION_CARD.LIST.COLUMNS.LOST_OR_STOLEN_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'isPossibleLostOrStolen',
                    title: 'FIDELITY_RECOMMENDATION_CARD.LIST.COLUMNS.POSSIBLE_LOST_OR_STOLEN_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'locked',
                    title: 'FIDELITY_RECOMMENDATION_CARD.LIST.COLUMNS.LOCKED_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'FIDELITY_RECOMMENDATION_CARD.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onToggleLock: (card) => this.toggleLock(card),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
            }
        }));
    }

    @action.bound
    async toggleLock(item) {
        this.loaderStore.suspend();
        item.isLockedOut = !item.isLockedOut;
        await this.service.update(item);
        this.rootStore.notificationStore.success(`Successfully ${item.isLockedOut ? 'locked' : 'unlocked'} card`);
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }

}

export default FidelityRecommendationCardViewStore;

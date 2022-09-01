import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { GivingCardListFilter } from 'application/administration/giving-card/models';

@applicationContext
class GivingCardViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'giving-card',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
            },
            queryConfig: {
                filter: new GivingCardListFilter('cardNumber', 'desc'),
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = ['donorGivingCardSetting', 'donorGivingCardSetting.donor'];
                        return rootStore.application.administration.givingCardStore.findGivingCard(params);
                    }
                }
            }
        });

        this.createTableStore()
    }

    @action.bound
    async toggleLock(item) {
        this.loaderStore.suspend();
        item.isLockedOut = !item.isLockedOut;
        await this.rootStore.application.administration.givingCardStore.updateGivingCard(item);
        this.rootStore.notificationStore.success(`Successfully ${item.isLockedOut ? 'locked' : 'unlocked'} card`);
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }
    @action.bound
    async toggleActivate(item) {
        this.loaderStore.suspend();
        item.isActivated = !item.isActivated;
        await this.rootStore.application.administration.givingCardStore.updateGivingCard(item);
        this.rootStore.notificationStore.success(`Successfully ${item.isLockedOut ? 'activated' : 'inactivated'} card`);
        await this.queryUtility.fetch();
        this.loaderStore.resume();
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'cardNumber',
                    title: 'GIVING_CARD.LIST.COLUMNS.CARD_NUMBER_LABEL'
                },
                {
                    key: 'cvv',
                    title: 'GIVING_CARD.LIST.COLUMNS.CVV_LABEL'
                },
                {
                    key: 'donorGivingCardSetting.donor.donorName',
                    title: 'GIVING_CARD.LIST.COLUMNS.DONOR_NAME_LABEL',
                    sortable: false
                },
                {
                    key: 'isLostOrStolen',
                    title: 'GIVING_CARD.LIST.COLUMNS.LOST_OR_STOLEN_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    },
                    sortable: false
                },
                {
                    key: 'isPossibleLostOrStolen',
                    title: 'GIVING_CARD.LIST.COLUMNS.POSSIBLE_LOST_OR_STOLEN_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    },
                    sortable: false
                },
                {
                    key: 'reportDescription',
                    title: 'GIVING_CARD.LIST.COLUMNS.LOST_OR_STOLEN_DESCRIPTION_LABEL',
                    sortable: false
                },
                {
                    key: 'isLockedOut',
                    title: 'GIVING_CARD.LIST.COLUMNS.LOCKED_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    },
                    sortable: false
                },
                {
                    key: 'isActivated',
                    title: 'GIVING_CARD.LIST.COLUMNS.ACTIVATED_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    },
                    sortable: false
                },
                {
                    key: 'dateCreated',
                    title: 'GIVING_CARD.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
            ],
            actions: {
                onToggleLock: (card) => this.toggleLock(card),
                onSort: (column) => this.queryUtility.changeOrder(column.key),
                onToggleActivate: (card) => this.toggleActivate(card)
            },
            actionsRender: {
            }
        }));
    }
}

export default GivingCardViewStore;

import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ActivityAndHistoryService } from 'application/activity-and-history/services';
import { applicationContext } from 'core/utils';
import { ActivityAndHistoryListFilter } from 'application/activity-and-history/models';
import { action } from 'mobx';

@applicationContext
class SettledPaymentTransactionViewStore extends BaseListViewStore {
    constructor(rootStore, { charityId, donorAccountId }) {
        let filter = new ActivityAndHistoryListFilter();
        filter.charityId = charityId;
        filter.donorAccountId = donorAccountId;

        super(rootStore, {
            name: 'activity-and-history',
            routes: {
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                disableChangeOrder: true,
                onResetFilter: (filter) => {
                    filter.charityId = charityId;
                    filter.donorAccountId = donorAccountId;
                }
            },
            actions: () => {
                const service = new ActivityAndHistoryService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        if (params.charityId || params.donorAccountId) {
                            const response = await service.find(params);
                            return response.data;
                        }
                        else {
                            return {};
                        }
                    }
                }
            }
        });

        this.rootStore = rootStore;
        this.isCharityUser = rootStore.userStore.applicationUser.roles.includes('Charities');
        this.isDonorUser = rootStore.userStore.applicationUser.roles.includes('Users');

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'dateCreated',
                    title: 'ACTIVITY_AND_HISTORY.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'paymentTransaction.description',
                    title: 'ACTIVITY_AND_HISTORY.LIST.COLUMNS.PAYMENT_DESCRIPTION_LABEL'
                },
                {
                    key: 'paymentTransaction.amount',
                    title: 'ACTIVITY_AND_HISTORY.LIST.COLUMNS.PAYMENT_AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'paymentTransaction.presentBalance',
                    title: 'ACTIVITY_AND_HISTORY.LIST.COLUMNS.PRESENT_BALANCE_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'activityConfirmationNumber',
                    title: 'ACTIVITY_AND_HISTORY.LIST.COLUMNS.ACTIVITY_TYPE_LABEL',
                    visible: !this.isCharityUser,
                    format: {
                        type: 'function',
                        value: (activity) => this.renderActivity(activity)
                    },
                    onClick: (activity) => this.redirectActivity(activity)
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }

    @action.bound
    redirectActivity(activity) {
        switch (activity.activityType) {
            case 1:
                this.rootStore.routerStore.goTo('master.app.main.contribution.list', null, { confirmationNumber: activity.activityConfirmationNumber });
                break;
            case 2:
                this.rootStore.routerStore.goTo('master.app.main.grant.list', null, { confirmationNumber: activity.activityConfirmationNumber });
                break;
            case 4:
                alert('TODO')
                break;
            case 8:
                this.rootStore.routerStore.goTo('master.app.main.session-certificate.list', null, { bookletCertificateCode: activity.activityConfirmationNumber });
                break;
            case 16:
                alert('TODO')
                break;
            case 32:
                this.rootStore.routerStore.goTo('master.app.main.booklet-order.list', null, { confirmationNumber: activity.activityConfirmationNumber });
                break;
            default:
                return;
        }
    }

    @action.bound
    renderActivity(activity) {
        switch (activity.activityType) {
            case 1:
                return 'Contribution'
            case 2:
                return 'Grant'
            case 4:
                return 'FundTransfer'
            case 8:
                return 'Session certificate'
            case 16:
                return 'Fee'
            case 32:
                return 'Booklet order'
            default:
                return '-'
        }
    }
}

export default SettledPaymentTransactionViewStore;

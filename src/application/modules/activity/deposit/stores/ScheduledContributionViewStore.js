import { TableViewStore, BaseListViewStore } from 'core/stores';
import { DonorContributionSettingService } from 'application/donor/services';
import { applicationContext } from 'core/utils';
import { FilterParams } from 'core/models';
import moment from 'moment';

@applicationContext
class ScheduledContributionViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'donor-contribution-setting',
            routes: {},
            queryConfig: {
                filter: new FilterParams(),
                disableUpdateQueryParams: true
            },
            actions: () => {
                this.contributionSettingService = new DonorContributionSettingService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'contributionSettingType',
                            'donorBankAccount'
                        ]
                        params.orderBy = 'isEnabled';
                        params.orderDirection = 'desc';

                        const response = await this.contributionSettingService.find({ donorId: this.donorId, ...params });
                        return response.data;
                    }
                }
            }
        });

        this.donorId = rootStore.userStore.applicationUser.id;
        this.createTableStore();
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'contributionSettingType.name',
                    title: 'DONOR_CONTRIBUTION_SETTING.LIST.COLUMNS.CONTRIBUTION_SETTING_TYPE_LABEL',
                },
                {
                    key: 'amount',
                    title: 'DONOR_CONTRIBUTION_SETTING.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'startDate',
                    title: 'DONOR_CONTRIBUTION_SETTING.LIST.COLUMNS.START_DATE_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'nextDate',
                    title: 'DONOR_CONTRIBUTION_SETTING.LIST.COLUMNS.NEXT_DATE_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'donorBankAccount.name',
                    title: 'DONOR_CONTRIBUTION_SETTING.LIST.COLUMNS.DONOR_BANK_ACCOUNT_LABEL',
                },
                {
                    key: 'isEnabled',
                    title: 'DONOR_CONTRIBUTION_SETTING.LIST.COLUMNS.ENABLED_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                }
            ],
            actions: {
                onEdit: (item) => this.openContributionSettingModal(item),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (item) => {
                    return item.startDate === item.nextDate && moment(item.startDate).isAfter(moment());
                }
            }
        }));
    }
}

export default ScheduledContributionViewStore;

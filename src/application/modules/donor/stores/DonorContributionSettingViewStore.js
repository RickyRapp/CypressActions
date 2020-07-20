import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { DonorContributionSettingService, DonorBankAccountService } from 'application/donor/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { DonorContributionSettingEditForm } from 'application/donor/forms';
import moment from 'moment';

@applicationContext
class DonorContributionSettingViewStore extends BaseListViewStore {
    contributionSettingService = null;

    formContributionSetting = new DonorContributionSettingEditForm({
        onSuccess: async form => {
            const resource = form.values();
            await this.updateContributionSettingAsync(resource);
        }
    });

    constructor(rootStore) {
        const donorId = rootStore.routerStore.routerState.params.id;
        super(rootStore, {
            name: 'donor-contribution-setting',
            routes: {
            },
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
                        params.donorId = donorId;
                        params.orderBy = 'isEnabled';
                        params.orderDirection = 'desc';
                        const response = await this.contributionSettingService.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.donorId = donorId;
        this.contributionSettingModal = new ModalParams({});

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
            },
            disablePaging: true,
            disableSorting: true
        }));

        this.donorBankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    let params = {
                        embed: ['accountHolder'],
                        donorId: this.donorId,
                        orderBy: 'dateCreated',
                        orderDirection: 'desc'
                    }
                    const bankAccountService = new DonorBankAccountService(rootStore.application.baasic.apiClient);
                    const response = await bankAccountService.find(params);
                    return response.data.item;
                }
            });
    }

    @action.bound
    openContributionSettingModal(setting) {
        this.formContributionSetting.clear();
        this.formContributionSetting.update(setting);
        this.donorBankAccountDropdownStore.setValue(setting.donorBankAccount)
        this.contributionSettingModal.open({
            formContributionSetting: this.formContributionSetting,
            donorBankAccountDropdownStore: this.donorBankAccountDropdownStore
        });
    }

    @action.bound
    async updateContributionSettingAsync(setting, message) {
        try {
            await this.contributionSettingService.update(setting);
            this.rootStore.notificationStore.success(message ? message : 'EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
            this.contributionSettingModal.close();
            await this.queryUtility.fetch();
        }
        catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }
}

export default DonorContributionSettingViewStore;

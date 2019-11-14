import React from 'react';
import { Date } from 'core/components';
import { action, runInAction, observable } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { ContributionSettingService } from 'application/contribution-setting/services';
import { DonorAccountService } from 'application/donor-account/services';
import { applicationContext, isSome } from 'core/utils';
import { LookupService } from 'common/services';
import { ContributionSettingListFilter } from 'application/contribution-setting/models';
import _ from 'lodash';
import moment from 'moment';

@applicationContext
class ContributionSettingViewStore extends BaseListViewStore {
    @observable accountTypes = null;

    constructor(rootStore) {
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.applicationUser.id
        const service = new ContributionSettingService(rootStore.application.baasic.apiClient);
        let filter = new ContributionSettingListFilter('dateCreated', 'desc')
        filter.donorAccountId = id;

        super(rootStore, {
            name: 'contribution-setting',
            authorization: 'theDonorsFundContributionSection',
            routes: {
                edit: (id, editId) => {
                    this.rootStore.routerStore.goTo(
                        'master.app.main.contribution-setting.edit',
                        {
                            id: id,
                            editId: editId
                        }
                    );
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                onResetFilter: (filter) => {
                    filter.donorAccountId = id;
                    this.contributionSettingTypeDropdownStore.setValue(null);
                    this.searchDonorAccountDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'donorAccount',
                            'donorAccount.companyProfile',
                            'donorAccount.coreUser',
                            'contributionSettingType',
                            'bankAccount'
                        ]
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
                    key: 'donorAccount.donorName',
                    title: 'CONTRIBUTION_SETTING.LIST.COLUMNS.DONOR_NAME_LABEL',
                    disableClick: true,
                    visible: this.hasPermission('theDonorsFundAdministrationSection.read')
                },
                {
                    key: 'amount',
                    title: 'CONTRIBUTION_SETTING.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'contributionSettingType.name',
                    title: 'CONTRIBUTION_SETTING.LIST.COLUMNS.CONTRIBUTION_SETTING_TYPE_NAME_LABEL',
                    format: {
                        type: 'function',
                        value: this.renderContributionSettingType
                    }
                },
                {
                    key: 'startDate',
                    title: 'CONTRIBUTION_SETTING.LIST.COLUMNS.START_DATE_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'bankAccount.name',
                    title: 'CONTRIBUTION_SETTING.LIST.COLUMNS.BANK_ACCOUNT_NAME_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'CONTRIBUTION_SETTING.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
                {
                    key: 'enabled',
                    title: 'CONTRIBUTION_SETTING.LIST.COLUMNS.ENABLED_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
            ],
            actions: {
                onEdit: (contributionSetting) => alert('TODO'),
                onCancel: (contributionSetting) => this.onCancel(contributionSetting.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (contributionSetting) => {
                    if (contributionSetting.enabled && (isSome(contributionSetting.nextDate) || contributionSetting.startDate === contributionSetting.nextDate)) {
                        return true;
                    }
                    return false;
                },
                onCancelRender: (contributionSetting) => {
                    if (contributionSetting.enabled && (isSome(contributionSetting.nextDate) || contributionSetting.startDate === contributionSetting.nextDate)) {
                        return true;
                    }
                    return false;
                }
            }
        }));

        const donorAccountService = new DonorAccountService(rootStore.application.baasic.apiClient);
        this.searchDonorAccountDropdownStore = new BaasicDropdownStore({
            placeholder: 'CONTRIBUTION_SETTING.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorAccountService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        embed: [
                            'coreUser',
                            'companyProfile',
                            'donorAccountAddresses',
                            'donorAccountAddresses.address'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.donorName } });
                },
                onChange: (donorAccountId) => {
                    this.queryUtility.filter['donorAccountId'] = donorAccountId;
                }
            });

        this.contributionSettingTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                onChange: (contributionSettingType) => {
                    this.queryUtility.filter['contributionSettingTypeIds'] = _.map(contributionSettingType, (status) => { return status.id });
                }
            });
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.fetchContributionSettingType()
            ]);
        }
    }

    @action.bound async onCancel(id) {
        this.rootStore.modalStore.showConfirm('CONTRIBUTION_SETTING.CANCEL.QUESTION',
            async () => {
                try {
                    await this.service.cancel({ id: id });
                    this.rootStore.notificationStore.success('CONTRIBUTION_SETTING.CANCEL.SUCCESS');
                } catch (error) {
                    this.rootStore.notificationStore.error('CONTRIBUTION_SETTING.CANCEL.ERROR');
                }
                await this.queryUtility.fetch();
            }
        );
    }

    @action.bound
    renderContributionSettingType(item) {
        return <React.Fragment>
            <span>{item.contributionSettingType.name} </span>
            {item.nextDate &&
                <React.Fragment>
                    - <Date value={item.nextDate} format={'short'} /> (in {moment(item.nextDate).diff(moment(), 'days')} day/s)
                </React.Fragment>}
        </React.Fragment>
    }

    @action.bound
    async fetchContributionSettingType() {
        this.contributionSettingTypeDropdownStore.setLoading(true);
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'contribution-setting-type');
        const response = await service.getAll();
        runInAction(() => {
            this.contributionSettingTypeDropdownStore.setItems(response.data);
            this.contributionSettingTypeDropdownStore.setLoading(false);
        });
    }
}

export default ContributionSettingViewStore;

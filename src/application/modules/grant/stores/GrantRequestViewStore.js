import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { GrantRequestService, GrantRequestRouteService } from 'application/grant/services';
import { DonorAccountService } from 'application/donor-account/services';
import { donorAccountFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { GrantRequestListFilter } from 'application/grant/models';
import { LookupService } from 'common/services';
import moment from 'moment'
import _ from 'lodash';

class GrantRequestViewStore extends BaseListViewStore {
    constructor(rootStore, { onChangeDonorFilter }) {
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.applicationUser.id;
        const queryParamsId = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') && rootStore.routerStore.routerState.queryParams ? rootStore.routerStore.routerState.queryParams.id : null;
        let filter = new GrantRequestListFilter('dateCreated', 'desc')
        filter.donorAccountId = id || queryParamsId;
        const service = new GrantRequestService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'grant',
            authorization: 'theDonorsFundGrantRequestSection',
            routes: {},
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                onResetFilter: (filter) => {
                    filter.donorAccountId = id;
                    this.searchDonorAccountDropdownStore.setValue(null);
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity',
                            'donorAccount',
                            'grantRequestStatus'
                        ];
                        params.fields = [
                            'id',
                            'charity',
                            'charity.name',
                            'charity.taxId',
                            'donorAccount',
                            'donorAccount.id',
                            'donorAccount.donorName',
                            'amount',
                            'dateCreated',
                            'grantRequestStatus'
                        ];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donorAccount.donorName',
                    title: 'GRANT_REQUEST.LIST.COLUMNS.DONOR_NAME_LABEL',
                    onClick: (grant) => this.routes.edit(grant.donorAccount.id, grant.id),
                    visible: this.hasPermission('theDonorsFundAdministrationSection.read')
                },
                {
                    key: 'charity.name',
                    title: 'GRANT_REQUEST.LIST.COLUMNS.CHARITY_LABEL',
                },
                {
                    key: 'amount',
                    title: 'GRANT_REQUEST.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'grantRequestStatus.name',
                    title: 'GRANT_REQUEST.LIST.COLUMNS.STATUS_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'GRANT_REQUEST.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key),
                onComplete: (item) => this.setAndOpenCompleteModal(item),
                onDecline: (item) => alert('2')
            },
            actionsRender: {
                onCompleteRender: (item) => {
                    return item.grantRequestStatus.abrv === 'open';
                },
                onDeclineRender: (item) => {
                    return item.grantRequestStatus.abrv === 'open';
                }
            }
        }));

        const donorAccountService = new DonorAccountService(rootStore.application.baasic.apiClient);
        this.searchDonorAccountDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT_REQUEST.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
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
                            'donorAccountAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAccountAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: donorAccountFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id) {
                        const id = rootStore.routerStore.routerState.queryParams.id;
                        const params = {
                            embed: [
                                'donorAccountAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'securityPin',
                                'donorAccountAddresses'
                            ]
                        }
                        const response = await donorAccountService.get(id, params);
                        rootStore.routerStore.setQueryParams(null);
                        return { id: response.data.id, name: response.data.donorName };
                    }
                    else {
                        return null;
                    }
                },
                onChange: (donorAccountId) => {
                    this.queryUtility.filter['donorAccountId'] = donorAccountId;
                    onChangeDonorFilter(donorAccountId);
                }
            });

        this.grantCreateOVerviewModalParams = new ModalParams({});
    }

    @action.bound
    async setAndOpenCompleteModal(item) {
        const grantAcknowledgmentTypeService = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-acknowledgment-type');
        const responseGrantAcknowledgmentType = await grantAcknowledgmentTypeService.getAll();

        const grantPurposeTypeService = new LookupService(this.rootStore.application.baasic.apiClient, 'grant-purpose-type');
        const responseGrantPurposeType = await grantPurposeTypeService.getAll();

        item.grantAcknowledgmentType = _.find(responseGrantAcknowledgmentType.data, { abrv: 'remain-anonymous' });
        item.grantPurposeType = _.find(responseGrantPurposeType.data, { abrv: 'where-deemed-most-needed' });

        this.grantCreateOVerviewModalParams.open({
            item: item
        });
    }

    @action.bound
    onEdit() {
        const donorAccountId = this.grantCreateOVerviewModalParams.data.item.donorAccount.id;
        const id = this.grantCreateOVerviewModalParams.data.item.id;
        debugger
        this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorAccountId }, { grantRequestId: id });
    }
}

export default GrantRequestViewStore;

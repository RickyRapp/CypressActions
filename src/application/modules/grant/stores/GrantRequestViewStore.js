import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { GrantRequestService } from 'application/grant/services';
import { DonorService } from 'application/donor/services';
import { donorFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { GrantRequestListFilter } from 'application/grant/models';
import { LookupService } from 'common/services';
import _ from 'lodash';

class GrantRequestViewStore extends BaseListViewStore {
    constructor(rootStore, { onChangeDonorFilter }) {
        let filter = new GrantRequestListFilter('dateCreated', 'desc')
        if (rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
            if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.donorId) {
                filter.donorId = rootStore.routerStore.routerState.queryParams.donorId;
            }
        }

        super(rootStore, {
            name: 'grant-request',
            authorization: 'theDonorsFundGrantRequestSection',
            routes: {},
            queryConfig: {
                filter: filter,
                onResetFilter: () => {
                    this.searchDonorDropdownStore.setValue(null);
                }
            },
            actions: () => {
                const service = new GrantRequestService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity',
                            'donor',
                            'grantRequestStatus',
                            'grant'
                        ];
                        params.fields = [
                            'id',
                            'charity',
                            'charity.name',
                            'charity.taxId',
                            'donor',
                            'donor.id',
                            'donor.donorName',
                            'amount',
                            'dateCreated',
                            'grantRequestStatus',
                            'grant'
                        ];

                        let userId = null;
                        if (!this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')) {
                            userId = rootStore.userStore.user.id
                        }

                        const response = await service.find({ userId: userId, ...params });
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'GRANT_REQUEST.LIST.COLUMNS.DONOR_NAME_LABEL',
                    onClick: (grant) => this.routes.edit(grant.donor.id, grant.id),
                    visible: this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')
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
                onDecline: (item) => this.declineRequest(item)
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

        const donorService = new DonorService(rootStore.application.baasic.apiClient);
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT_REQUEST.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.id) {
                        const id = rootStore.routerStore.routerState.queryParams.id;
                        const params = {
                            embed: [
                                'donorAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'securityPin',
                                'donorAddresses'
                            ]
                        }
                        const response = await donorService.get(id, params);
                        rootStore.routerStore.setQueryParams(null);
                        return { id: response.data.id, name: response.data.donorName };
                    }
                    else {
                        return null;
                    }
                },
                onChange: (donorId) => {
                    this.queryUtility.filter['donorId'] = donorId;
                    onChangeDonorFilter(donorId);
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
        const donorId = this.grantCreateOVerviewModalParams.data.item.donor.id;
        const id = this.grantCreateOVerviewModalParams.data.item.id;
        this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorId }, { grantRequestId: id });
    }

    @action.bound
    async onConfirm() {
        this.loaderStore.suspend();
        const service = new GrantRequestService(this.rootStore.application.baasic.apiClient);
        const id = this.grantCreateOVerviewModalParams.data.item.id;
        await service.complete({ id: id });
        await this.queryUtility.fetch();
        this.grantCreateOVerviewModalParams.close();
        this.rootStore.notificationStore.success('Successfully declined');
        this.loaderStore.resume();
    }

    @action.bound
    async declineRequest(item) {
        this.rootStore.modalStore.showConfirm(
            'Are you sure you want to decline request?',
            async () => {
                this.loaderStore.suspend();
                if (item.grantRequestStatus.abrv === 'open') {
                    const service = new GrantRequestService(this.rootStore.application.baasic.apiClient);
                    await service.decline({ id: item.id });
                }

                await this.queryUtility.fetch();
                this.rootStore.notificationStore.success('Successfully declined');
                this.loaderStore.resume();
            }
        );
    }
}

export default GrantRequestViewStore;

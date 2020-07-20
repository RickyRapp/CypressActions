import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { GrantService, GrantRouteService } from 'application/grant/services';
import { DonorService } from 'application/donor/services';
import { donorFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { GrantListFilter } from 'application/grant/models';
import { LookupService } from 'common/services';
import moment from 'moment'
import _ from 'lodash';

class GrantViewStore extends BaseListViewStore {
    constructor(rootStore, { onChangeDonorFilter }) {
        const id = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') ? null : rootStore.userStore.applicationUser.id;
        const queryParamsId = rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') && rootStore.routerStore.routerState.queryParams ? rootStore.routerStore.routerState.queryParams.id : null;
        let filter = new GrantListFilter('dateCreated', 'desc')
        filter.donorId = id || queryParamsId;
        const service = new GrantService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'grant',
            authorization: 'theDonorsFundGrantSection',
            routes: {
                edit: (id, editId) => {
                    this.rootStore.routerStore.goTo('master.app.main.grant.edit', { id: id, editId: editId });
                },
                scheduledGrantsList: (name) => {
                    this.rootStore.routerStore.goTo('master.app.main.grant.tab', null, { tab: 1, name: name });
                },
                preview: (editId) => {
                    this.rootStore.routerStore.goTo('master.app.main.grant.preview', { editId: editId });
                },
                create: () => {
                    if (this.hasPermission('theDonorsFundAdministrationSection.create')) {
                        this.openSelectDonorModal();
                    }
                    else {
                        this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: id });
                    }
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                onResetFilter: (filter) => {
                    filter.donorId = id;
                    this.donationStatusDropdownStore.setValue(null);
                    this.searchDonorDropdownStore.setValue(null);
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity',
                            'grantPurposeType',
                            'createdByCoreUser',
                            'donor',
                            'donationStatus',
                            'grantScheduledPayment'
                        ];
                        params.fields = [
                            'id',
                            'charity',
                            'charity.name',
                            'donor',
                            'donor.id',
                            'donor.donorName',
                            'amount',
                            'confirmationNumber',
                            'donationStatus',
                            'grantPurposeType',
                            'dateCreated',
                            'scheduledGrantPayment'
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
                    key: 'donor.donorName',
                    title: 'GRANT.LIST.COLUMNS.DONOR_NAME_LABEL',
                    onClick: (grant) => grant.donationStatus.abrv === 'pending' ?
                        this.routes.edit(grant.donor.id, grant.id) :
                        this.routes.preview(grant.id),
                    visible: this.hasPermission('theDonorsFundAdministrationSection.read')
                },
                {
                    key: 'charity.name',
                    title: 'GRANT.LIST.COLUMNS.CHARITY_LABEL',
                },
                {
                    key: 'amount',
                    title: 'GRANT.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'confirmationNumber',
                    title: 'GRANT.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                },
                {
                    key: 'donationStatus.name',
                    title: 'GRANT.LIST.COLUMNS.GRANT_STATUS_NAME_LABEL',
                },
                {
                    key: 'grantPurposeType.name',
                    title: 'GRANT.LIST.COLUMNS.GRANT_PURPOSE_TYPE_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'GRANT.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (grant) => this.routes.edit(grant.donor.id, grant.id),
                onRedirect: (grant) => this.routes.scheduledGrantsList(grant.scheduledGrantPayment.name),
                onPreview: (grant) => this.routes.preview(grant.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (grant) => {
                    if (grant.donationStatus.abrv === 'pending') {
                        if (this.hasPermission('theDonorsFundAdministrationSection.update')) {
                            return true;
                        }
                        else {
                            const dateToEdit = moment(grant.dateCreated).add('minutes', 15);
                            return moment().isBetween(grant.dateCreated, dateToEdit);
                        }
                    }
                },
                onRedirectRender: (grant) => {
                    if (grant.scheduledGrantPayment) {
                        return true;
                    }
                    return false;
                },
            }
        }));

        this.reviewModal = new ModalParams({});

        const donorService = new DonorService(rootStore.application.baasic.apiClient);
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
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

        this.donationStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    const service = new LookupService(this.rootStore.application.baasic.apiClient, 'donation-status');
                    const response = await service.getAll();
                    return response.data;
                },
                onChange: (donationStatus) => {
                    this.queryUtility.filter['donationStatusIds'] = _.map(donationStatus, (status) => { return status.id });
                }
            });

        this.exportConfig = {
            fileName: `Grants_${moment().format("YYYY-MM-DD_HH-mm-ss")}`,
            columns: [
                { id: 1, title: 'Date', key: 'DATE CREATED', selected: true, visible: this.hasPermission('theDonorsFundGrantSection.read') },
                { id: 2, title: 'Charity', key: 'CHARITY', selected: true, visible: this.hasPermission('theDonorsFundGrantSection.read') },
                { id: 3, title: 'Charity type', key: 'CHARITY TYPE', selected: false, visible: this.hasPermission('theDonorsFundAdministrationSection.read') },
                { id: 4, title: 'Charity address', key: 'CHARITY ADDRESS', selected: false, visible: this.hasPermission('theDonorsFundAdministrationSection.read') },
                { id: 5, title: 'Account number', key: 'ACCOUNT NUMBER', selected: false, visible: this.hasPermission('theDonorsFundAdministrationSection.read') },
                { id: 6, title: 'TaxId', key: 'TAX ID', selected: true, visible: this.hasPermission('theDonorsFundGrantSection.read') },
                { id: 7, title: 'Amount', key: 'AMOUNT', selected: true, visible: this.hasPermission('theDonorsFundGrantSection.read') },
                { id: 8, title: 'Confirmation number', key: 'CONFIRMATION NUMBER', selected: true, visible: this.hasPermission('theDonorsFundGrantSection.read') },
                { id: 9, title: 'Status', key: 'STATUS', selected: false, visible: this.hasPermission('theDonorsFundGrantSection.read') }
            ],
            exportUrlFunc: (exportData) => { return this.getExportUrl(exportData); }
        }
    }

    getExportUrl({ exportType, exportLimit, exportFields }) {
        const routeService = new GrantRouteService();
        let filter = this.queryUtility.filter;
        filter.exportFields = exportFields;
        filter.exportLimit = exportLimit;
        filter.exportType = exportType;
        return routeService.export(filter);
    }

    @action.bound
    openReviewDonorModal(id) {
        this.reviewModal.open({
            id: id,
            onAfterReview: () => { this.reviewModal.close(); this.queryUtility.fetch(); }
        });
    }
}

export default GrantViewStore;

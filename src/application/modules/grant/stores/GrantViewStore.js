import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { GrantRouteService } from 'application/grant/services';
import { donorFormatter } from 'core/utils';
import { ModalParams } from 'core/models';
import { GrantListFilter } from 'application/grant/models';
import moment from 'moment'

class GrantViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'grant',
            authorization: 'theDonorsFundGrantSection',
            routes: {
                create: () => {
                    this.openSelectDonorModal();
                },
                edit: (editId, donorId) => {
                    this.rootStore.routerStore.goTo('master.app.main.grant.edit', { editId: editId }, { donorId: donorId });
                },
                scheduledGrantsList: (name) => {
                    this.rootStore.routerStore.goTo('master.app.main.grant.tab', null, { tab: 1, name: name });
                },
                preview: (editId) => {
                    this.rootStore.routerStore.goTo('master.app.main.grant.preview', { editId: editId });
                }
            },
            queryConfig: {
                filter: new GrantListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
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
                            'donationType',
                            'scheduledGrantPayment'
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
                            'donationType',
                            'grantPurposeType',
                            'dateCreated',
                            'scheduledGrantPayment'
                        ];

                        return this.rootStore.application.grant.grantStore.findGrants(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.createSearchDonorDropdownStore();
        this.createDonationStatusDropdownStore();
        this.createExportConfig();
        this.reviewModal = new ModalParams({});
        this.selectDonorModal = new ModalParams({});
    }

    @action.bound
    openSelectDonorModal() {
        this.selectDonorModal.open(
            {
                donorId: this.queryUtility.filter.donorId,
                onClickDonorFromFilter: (donorId) => this.rootStore.routerStore.goTo('master.app.main.grant.create', null, { id: donorId }),
                onChange: (donorId) => this.rootStore.routerStore.goTo('master.app.main.grant.create', null, { id: donorId })
            }
        );
    }

    @action.bound
    onClickDonorFromFilter(donorId) {
        this.rootStore.routerStore.goTo('master.app.main.grant.create', { id: donorId })
    }

    @action.bound
    openReviewDonorModal(id) {
        this.reviewModal.open({
            id: id,
            onAfterReview: () => {
                this.reviewModal.close();
                this.queryUtility.fetch();
            }
        });
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'GRANT.LIST.COLUMNS.DONOR_NAME_LABEL',
                    onClick: (grant) => grant.donationStatus.abrv === 'pending' ?
                        this.routes.edit(grant.id, grant.donor.id) :
                        this.routes.preview(grant.id),
                    visible: this.hasAdministratorPermission
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
                    key: 'donationType.name',
                    title: 'GRANT.LIST.COLUMNS.GRANT_TYPE_NAME_LABEL',
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
                onEdit: (grant) => this.routes.edit(grant.id, grant.donor.id),
                onRedirect: (grant) => this.routes.scheduledGrantsList(grant.scheduledGrantPayment.name),
                onPreview: (grant) => this.routes.preview(grant.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (grant) => {
                    if (grant.donationStatus.abrv === 'pending') {
                        if (this.hasAdministratorPermission) {
                            return true;
                        }
                        else {
                            const dateToEdit = moment(grant.dateCreated).add(15, 'minutes');
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
    }

    createSearchDonorDropdownStore() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.grant.grantStore.searchDonor({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'firstName',
                            'lastName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return data.map(x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                initValueFunc: async () => {
                    if (this.rootStore.routerStore.routerState.queryParams && this.rootStore.routerStore.routerState.queryParams.donorId) {
                        const id = this.rootStore.routerStore.routerState.queryParams.donorId;
                        const params = {
                            embed: [
                                'donorAddresses'
                            ],
                            fields: [
                                'id',
                                'accountNumber',
                                'donorName',
                                'firstName',
                                'lastName',
                                'securityPin',
                                'donorAddresses'
                            ]
                        }
                        const data = await this.rootStore.application.grant.grantStore.getDonor(id, params);
                        return { id: data.id, name: donorFormatter.format(data, { type: 'donor-name', value: 'dropdown' }) };
                    }
                    else {
                        return null;
                    }
                },
                onChange: (donorId) => {
                    this.queryUtility.filter.donorId = donorId;
                }
            });
    }

    createDonationStatusDropdownStore() {
        this.donationStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: () => {
                    return this.rootStore.application.lookup.donationStatusStore.find();
                },
                onChange: (donationStatus) => {
                    this.queryUtility.filter.donationStatusIds = donationStatus.map(c => { return c.id });
                }
            });
    }

    createExportConfig() {
        this.exportConfig = {
            fileName: `Grants_${moment().format("YYYY-MM-DD_HH-mm-ss")}`,
            columns: [
                { id: 1, title: 'Date', key: 'DATE CREATED', selected: true, visible: this.rootStore.permissionStore.hasPermission('theDonorsFundGrantSection.read') },
                { id: 2, title: 'Charity', key: 'CHARITY', selected: true, visible: this.rootStore.permissionStore.hasPermission('theDonorsFundGrantSection.read') },
                { id: 3, title: 'Charity type', key: 'CHARITY TYPE', selected: false, visible: this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') },
                { id: 4, title: 'Charity address', key: 'CHARITY ADDRESS', selected: false, visible: this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') },
                { id: 5, title: 'Account number', key: 'ACCOUNT NUMBER', selected: false, visible: this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read') },
                { id: 6, title: 'TaxId', key: 'TAX ID', selected: true, visible: this.rootStore.permissionStore.hasPermission('theDonorsFundGrantSection.read') },
                { id: 7, title: 'Amount', key: 'AMOUNT', selected: true, visible: this.rootStore.permissionStore.hasPermission('theDonorsFundGrantSection.read') },
                { id: 8, title: 'Confirmation number', key: 'CONFIRMATION NUMBER', selected: true, visible: this.rootStore.permissionStore.hasPermission('theDonorsFundGrantSection.read') },
                { id: 9, title: 'Status', key: 'STATUS', selected: false, visible: this.rootStore.permissionStore.hasPermission('theDonorsFundGrantSection.read') }
            ],
            exportUrlFunc: (exportData) => {
                const routeService = new GrantRouteService();
                let filter = this.queryUtility.filter;
                filter.exportFields = exportData.exportFields;
                filter.exportLimit = exportData.exportLimit;
                filter.exportType = exportData.exportType;
                return routeService.export(filter);
            }
        }
    }
}

export default GrantViewStore;

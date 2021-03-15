import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore } from 'core/stores';
import { GrantRouteService } from 'application/administration/grant/services';
import { charityFormatter, donorFormatter, isSome } from 'core/utils';
import { ModalParams } from 'core/models';
import { GrantListFilter } from 'application/administration/grant/models';
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
                edit: (editId) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.grant.edit', { id: editId });
                },
                scheduledGrantsList: (name) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.grant.tab', null, { tab: 1, name: name });
                },
                preview: (editId) => {
                    this.rootStore.routerStore.goTo('master.app.main.administration.grant.preview', { id: editId });
                }
            },
            queryConfig: {
                filter: new GrantListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.donationStatusDropdownStore.setValue(null);
                    this.searchDonorDropdownStore.setValue(null);
                    this.searchCharityDropdownStore.setValue(null);
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
                            'purposeNote',
                            'dateCreated',
                            'scheduledGrantPayment'
                        ];

                        return this.rootStore.application.administration.grantStore.findGrant(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.createSearchDonorDropdownStore();
        this.createSearchCharityDropdownStore();
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
                onClickDonorFromFilter: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.grant.create', { id: donorId }),
                onChange: (donorId) => this.rootStore.routerStore.goTo('master.app.main.administration.grant.create', { id: donorId })
            }
        );
    }

    @action.bound
    onClickDonorFromFilter(donorId) {
        this.rootStore.routerStore.goTo('master.app.main.administration.grant.create', { id: donorId })
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
                        this.routes.preview(grant.id)
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
                    format: {
                        type: 'function',
                        value: this.renderGrantPurposeType
                    }
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
                onEdit: (grant) => this.routes.edit(grant.id),
                onRedirect: (grant) => this.routes.scheduledGrantsList(grant.scheduledGrantPayment.name),
                onPreview: (grant) => this.routes.preview(grant.id),
                onApprove: (grant) => this.approveGrant(grant),
                onCancel: (grant) => this.cancelGrant(grant),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (grant) => {
                    return grant.donationStatus.abrv === 'pending' || grant.donationStatus.abrv === 'approved'
                },
                onRedirectRender: (grant) => {
                    return isSome(grant.scheduledGrantPayment)
                },
                onApproveRender: (grant) => {
                    return grant.donationStatus.abrv === 'pending';
                },
                onCancelRender: (grant) => {
                    return grant.donationStatus.abrv === 'pending' || grant.donationStatus.abrv === 'approved';
                },
            }
        }));
    }

    @action.bound
    async approveGrant(grant) {
        this.rootStore.modalStore.showConfirm(
            'Are you sure you want to approve grant?',
            async () => {
                try {
                    await this.rootStore.application.administration.grantStore.approveGrant({ id: grant.id });
                    this.queryUtility.fetch();
                    this.rootStore.notificationStore.success('Successfully approved grant.');
                } catch ({ data }) {
                    if (data && data.message) {
                        this.rootStore.notificationStore.error(data.message);
                    }
                    else {
                        this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_UPDATE');
                    }
                }
            }
        );
    }

    @action.bound
    async cancelGrant(grant) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to cancel grant #${grant.confirmationNumber}?`,
            async () => {
                try {
                    await this.rootStore.application.administration.grantStore.cancelGrant({ id: grant.id });
                    this.queryUtility.fetch();
                    this.rootStore.notificationStore.success('Successfully canceled grant.');
                } catch ({ data }) {
                    if (data && data.message) {
                        this.rootStore.notificationStore.error(data.message);
                    }
                    else {
                        this.rootStore.notificationStore.error('EDIT_FORM_LAYOUT.ERROR_UPDATE');
                    }
                }
            }
        );
    }

    renderGrantPurposeType(item) {
        if (item.grantPurposeType.abrv === 'other' || item.grantPurposeType.abrv === 'in-honor-of' || item.grantPurposeType.abrv === 'solicited-by') {
            return `${item.grantPurposeType.name} - ${item.purposeNote}`
        }
        return item.grantPurposeType.name;
    }

    createSearchDonorDropdownStore() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.donorStore.searchDonor({
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
                    return data.item.map(x => {
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
                        const data = await this.rootStore.application.administration.grantStore.getDonor(id, params);
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

    createSearchCharityDropdownStore() {
        this.searchCharityDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.grantStore.searchCharity({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name',
                            'charityAddresses'
                        ]
                    });
                    return data.item.map(x => { return { id: x.id, name: charityFormatter.format(x, { value: 'charity-name-display' }), item: x } });
                },
                onChange: (charityId) => {
                    this.queryUtility.filter.charityId = charityId;
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

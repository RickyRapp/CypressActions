import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { FilterParams } from 'core/models';
import { charityFormatter, donorFormatter } from 'core/utils';
import { SessionListFilter } from '../models';

class SessionPendingCertificateViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'session-pending-certificates',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {},
            queryConfig: {
                filter: new SessionListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                    this.paymentTypeDropdownStore.setValue(null);
                    this.donationStatusDropdownStore.setValue(null);
                    this.searchCharityDropdownStore.setValue(null);
                    this.searchDonorDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                } 
            },
            actions: () => {
                return {
                    find: async (params) => {
                        console.log(params);
                        params.embed = [
                            'charity',
                            'certificate',
                            'certificate.denominationType',
                            'certificate.booklet',
                            'certificate.booklet.bookletOrder',
                            'certificate.booklet.bookletOrder.donor',
                            'session'
                        ];

                        const statuses = await rootStore.application.lookup.sessionPendingCertificateStatusStore.find();
                        params.sessionPendingCertificateStatusIds = statuses.find(c => c.abrv === 'pending').id;

                        return rootStore.application.administration.sessionStore.findSessionPendingCertificate(params);
                    }
                }
            }
        });
        this.createSearchCharityDropdownStore();
        this.createPaymentTypeDropdownStore();
        this.createDonationStatusDropdownStore();
        this.createDateCreatedDateRangeQueryStore();
        this.createDonorSearchDropdownStore();
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'charity.name',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.CHARITY_NAME_LABEL',
                },
                {
                    key: 'session.confirmationNumber',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.CONFIRMATION_LABEL',
                },
                {
                    key: 'certificate.booklet.bookletOrder.donor.donorName',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DONOR_LABEL',
                },
                {
                    key: 'certificate.booklet.bookletOrder.donor.donorName',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.CHECK_NUMBER_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return (item && item.certificate.booklet && item.certificate.booklet.code) + '-' + (item && item.certificate && item.certificate.code);
                        }
                    }
                },
                {
                    key: 'certificate.denominationType',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DENOMINATION_LABEL',
                    format: {
                        type: 'denomination',
                        value: 'short'
                    }
                },
                {
                    key: 'blankCertificateValue',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {},
            actionsRender: {}
        }));
    }
    createDonorSearchDropdownStore() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'BOOKLET_ORDER.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
            initFetch: true,
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
                            'securityPin',
                            'donorAddresses',
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
                                'securityPin',
                                'donorAddresses',
                            ]
                        }
                        const data = await this.rootStore.application.administration.donorStore.getDonor(id, params);
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
            placeholder: 'SESSION.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.charityStore.searchCharity({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses'
                        ],
                        fields: ['id', 'taxId', 'name', 'charityAddresses', 'isAchAvailable', 'charityTypeId', 'addressLine1', 'addressLine2', 'charityAddressId', 'city', 'zipCode', 'state', 'isPrimary']
                    });
                    return data.item.map(x => { return { id: x.id, name: charityFormatter.format(x, { value: 'charity-name-display' }) } });
                },
                onChange: (charityId) => {
                    this.queryUtility.filter.charityId = charityId;
                }
            });
    }

    createPaymentTypeDropdownStore() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.paymentTypeStore.find();
                },
                onChange: (paymentType) => {
                    this.queryUtility.filter.paymentTypeIds = paymentType.map((type) => { return type.id });
                }
            });
    }

    createDonationStatusDropdownStore() {
        this.donationStatusDropdownStore = new BaasicDropdownStore({
            multi: true
        },
            {
                fetchFunc: async () => {
                    return this.rootStore.application.lookup.donationStatusStore.find();
                },
                onChange: (donationStatus) => {
                    this.queryUtility.filter.donationStatusIds = donationStatus.map((status) => { return status.id });
                }
            });
    }

    createDateCreatedDateRangeQueryStore() {
        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }
}

export default SessionPendingCertificateViewStore;

import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { SessionCertificateService } from 'application/session-certificate/services';
import { CharityService } from 'application/charity/services';
import { DonorAccountService } from 'application/donor-account/services';
import { donorAccountFormatter } from 'core/utils';
import { SessionCertificateListFilter } from 'application/session-certificate/models';
import _ from 'lodash';

class SessionCertificateViewStore extends BaseListViewStore {
    constructor(rootStore) {
        let filter = new SessionCertificateListFilter('dateCreated', 'desc')
        const service = new SessionCertificateService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'session-certificate',
            routes: {
            },
            queryConfig: {
                filter: filter,
                onResetFilter: () => {
                    this.searchCharityDropdownStore.setValue(null);
                    this.searchDonorAccountDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
                },
                queryParamMap: {
                    bookletCertificateCode: { fromQuery: (queryParamValue) => { return queryParamValue } }
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'certificate',
                            'certificate.booklet',
                            'certificate.booklet.denominationType',
                            'certificate.booklet.donorAccount',
                            'certificate.booklet.donorAccount.companyProfile',
                            'certificate.booklet.donorAccount.coreUser',
                            'session',
                            'session.donation',
                            'session.donation.charity'
                        ];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.isCharityUser = rootStore.userStore.applicationUser.roles.includes('Charities');
        this.isDonorUser = rootStore.userStore.applicationUser.roles.includes('Users');

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'certificate.booklet.donorAccount.donorName',
                    title: 'SESSION_CERTIFICATE.LIST.COLUMNS.DONOR_NAME_LABEL',
                    visible: !this.isDonorUser
                },
                {
                    key: 'session.donation.charity.name',
                    title: 'SESSION_CERTIFICATE.LIST.COLUMNS.CHARITY_NAME_LABEL',
                    visible: !this.isCharityUser
                },
                {
                    key: 'certificate.booklet.denominationType',
                    title: 'SESSION_CERTIFICATE.LIST.COLUMNS.DENOMINATION_LABEL',
                    format: {
                        type: 'denomination',
                        value: 'short',
                        additionalField: 'blankCertificateValue'
                    }
                },
                {
                    key: 'certificate.code',
                    title: 'SESSION_CERTIFICATE.LIST.COLUMNS.CERTIFICATE_CODE_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => { return `${item.certificate.booklet.code}-${item.certificate.code}`; }
                    }
                },
                {
                    key: 'session.dateProcessed',
                    title: 'SESSION_CERTIFICATE.LIST.COLUMNS.DATE_PROCESSED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                },
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));

        this.service = service;
        this.rootStore = rootStore;

        const charityService = new CharityService(rootStore.application.baasic.apiClient);
        this.searchCharityDropdownStore = new BaasicDropdownStore({
            placeholder: 'SESSION_CERTIFICATE.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await charityService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses',
                            'charityAddresses.address'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.name } });
                },
                onChange: (charityId) => {
                    this.queryUtility.filter['charityId'] = charityId;
                }
            });

        const donorAccountService = new DonorAccountService(rootStore.application.baasic.apiClient);
        this.searchDonorAccountDropdownStore = new BaasicDropdownStore({
            placeholder: 'SESSION_CERTIFICATE.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
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
                    return _.map(response.item, x => {
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
                                'donorName'
                            ]
                        }
                        const response = await donorAccountService.get(id, params);
                        rootStore.routerStore.setQueryParams(null);
                        return _.map(response.item, x => {
                            return {
                                id: x.id,
                                name: donorAccountFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                            }
                        });
                    }
                    else {
                        return null;
                    }
                },
                onChange: (donorAccountId) => {
                    this.queryUtility.filter['donorAccountId'] = donorAccountId;
                }
            });

        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }
}

export default SessionCertificateViewStore;

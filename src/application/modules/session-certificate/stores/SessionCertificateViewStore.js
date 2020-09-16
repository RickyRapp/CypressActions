import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { SessionCertificateService } from 'application/session-certificate/services';
import { CharityService } from 'application/charity/services';
import { DonorService } from 'application/donor/services';
import { donorFormatter } from 'core/utils';
import { SessionCertificateListFilter } from 'application/session-certificate/models';
import _ from 'lodash';

class SessionCertificateViewStore extends BaseListViewStore {
    constructor(rootStore) {
        let filter = new SessionCertificateListFilter('dateCreated', 'desc')
        const service = new SessionCertificateService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'session-certificate',
            routes: {},
            queryConfig: {
                filter: filter,
                onResetFilter: () => {
                    this.searchCharityDropdownStore.setValue(null);
                    this.searchDonorDropdownStore.setValue(null);
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
                            'certificate.booklet.donor',
                            'session',
                            'session.charity'
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
                    key: 'certificate.booklet.donor.donorName',
                    title: 'SESSION_CERTIFICATE.LIST.COLUMNS.DONOR_NAME_LABEL',
                    visible: this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.read')
                },
                {
                    key: 'session.charity.name',
                    title: 'SESSION_CERTIFICATE.LIST.COLUMNS.CHARITY_NAME_LABEL'
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
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));

        this.service = service;

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
                            'charityAddresses'
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

        const donorService = new DonorService(rootStore.application.baasic.apiClient);
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'SESSION_CERTIFICATE.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
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
                }
            });

        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }
}

export default SessionCertificateViewStore;

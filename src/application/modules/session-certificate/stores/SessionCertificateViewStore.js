import React from 'react';
import { action } from 'mobx';
import { TableViewStore, BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore } from 'core/stores';
import { SessionCertificateService } from 'application/session-certificate/services';
import { CharityService } from 'application/charity/services';
import { applicationContext, isSome } from 'core/utils';
import { FormatterResolver } from 'core/components';
import { SessionCertificateListFilter } from 'application/session-certificate/models';
import _ from 'lodash';

@applicationContext
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
                disableUpdateQueryParams: true,
                onResetFilter: () => {
                    this.searchCharityDropdownStore.setValue(null);
                    this.dateCreatedDateRangeQueryStore.reset();
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
                            'session.donation.charity',
                            'sessionCertificateDonorAccountTransactions',
                            'sessionCertificateDonorAccountTransactions.paymentTransaction',
                            'sessionCertificateDonorAccountTransactions.paymentTransaction.paymentTransactionStatus'
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
                    key: 'certificate.booklet.donorAccount.donorName',
                    title: 'SESSION_CERTIFICATE.LIST.COLUMNS.DONOR_NAME_LABEL',
                    visible: !rootStore.userStore.applicationUser.roles.includes('Users')
                },
                {
                    key: 'session.donation.charity.name',
                    title: 'SESSION_CERTIFICATE.LIST.COLUMNS.CHARITY_NAME_LABEL',
                    visible: !rootStore.userStore.applicationUser.roles.includes('Charities')
                },
                {
                    key: 'value',
                    title: 'SESSION_CERTIFICATE.LIST.COLUMNS.DENOMINATION_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            const value = item.certificate.booklet.denominationType.abrv === 'blank' ? '$' + item.blankCertificateValue : '$' + item.certificate.booklet.denominationType.value;
                            if (item.certificate.booklet.denominationType.abrv === 'blank') {
                                return `${value} (${item.certificate.booklet.denominationType.name})`;
                            }
                            return value;
                        }
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
                    key: 'date',
                    title: 'SESSION_CERTIFICATE.LIST.COLUMNS.DATE_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            const date = _.find(item.sessionCertificateDonorAccountTransactions, (item) => { return item.paymentTransaction.paymentTransactionStatus.abrv === 'settled' }).dateCreated;
                            return <FormatterResolver
                                item={{ date: date }}
                                field='date'
                                format={{ type: 'date', value: 'short' }}
                            />
                        }
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
            placeholder: 'SESSION.LIST.FILTER.SELECT_CHARITY_PLACEHOLDER',
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

        this.dateCreatedDateRangeQueryStore = new DateRangeQueryPickerStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
        }
    }
}

export default SessionCertificateViewStore;

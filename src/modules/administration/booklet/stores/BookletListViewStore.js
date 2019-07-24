import React from 'react'
import { observable } from 'mobx';
import { BookletService, DonorAccountService } from "common/data";
import { BookletListFilter } from 'modules/administration/booklet/models';
import { BaseBookletListViewStore } from 'modules/common/booklet/stores';
import ReactTooltip from 'react-tooltip'
import { formatDenomination, getDonorNameDropdown, getDonorAccountDropdownOptions } from 'core/utils';
import { BaasicDropdownStore } from "core/stores";
import _ from 'lodash';

class BookletListViewStore extends BaseBookletListViewStore {
    @observable donorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const bookletService = new BookletService(rootStore.app.baasic.apiClient);
        let filter = new BookletListFilter();
        filter.donorAccountId = rootStore.routerStore.routerState.queryParams ? rootStore.routerStore.routerState.queryParams.donorAccountId : null;

        const listViewStore = {
            routes: {
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.administration.booklet.create')
                },
                details: (id) => {
                    this.rootStore.routerStore.navigate('master.app.administration.booklet.details', { id: id });
                }
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = ['certificates', 'donorAccount', 'donorAccount.coreUser', 'donorAccount.companyProfile'];
                    params.fields = [
                        'id',
                        'donorAccountId',
                        'dateUpdated',
                        'dateCreated',
                        'code',
                        'denominationTypeId',
                        'bookletStatusId',
                        'dateAssigned',
                        'donorAccount',
                        'donorAccount.id',
                        'donorAccount.donorName',
                        'createdByCoreUser',
                        'createdByCoreUser.userId',
                        'createdByCoreUser.firstName',
                        'createdByCoreUser.lastName',
                        'certificates',
                        'certificates.certificateStatusId',
                        'certificates.isActive'
                    ];
                    params.orderBy = params.orderBy || 'code';
                    params.orderDirection = params.orderDirection || 'desc';
                    const response = await bookletService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        };

        const config = {
            listViewStore: listViewStore
        }

        super(rootStore, config);
        this.bookletService = bookletService;
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        const countTooltip =
            <React.Fragment>
                <span className='icomoon tiny icon-question-circle' data-tip data-for={'count'} />
                <ReactTooltip type='info' effect='solid' place="top" id={'count'}>
                    <p>CLEAN / USED / CANCELED | ACTIVE</p>
                </ReactTooltip>
            </React.Fragment>

        this.setColumns = [
            {
                key: 'code',
                title: 'CODE',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'denominationTypeId',
                title: 'DENOMINATION',
                type: 'function',
                function: (item) => {
                    const value = _.find(this.denominationTypes, { id: item.denominationTypeId });
                    return formatDenomination(value);
                }
            },
            {
                key: 'donorAccount.donorName',
                title: 'DONORNAME'
            },
            {
                key: 'dateAssigned',
                title: 'ASSIGNEDON',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'bookletStatusId',
                title: 'STATUS',
                type: 'function',
                function: (item) => _.find(this.bookletStatuses, { id: item.bookletStatusId }).name,
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'certificates',
                title: 'COUNT',
                titleTooltip: countTooltip,
                type: 'function',
                function: (item) => {
                    const clean = _.filter(item.certificates, { certificateStatusId: this.cleanCertificateStatusId }).length;
                    const used = _.filter(item.certificates, { certificateStatusId: this.usedCertificateStatusId }).length;
                    const canceled = _.filter(item.certificates, { certificateStatusId: this.canceledCertificateStatusId }).length;
                    const active = _.filter(item.certificates, { isActive: true }).length;
                    return `${clean} / ${used} / ${canceled} | ${active}`;
                }
            },
            {
                key: 'dateCreated',
                title: 'DATECREATED',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            }
        ];

        this.setActions = {
        }
    }

    async setStores() {
        super.setStores();

        this.donorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Donor',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = getDonorAccountDropdownOptions;

                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: (option) => this.queryUtility.filter.donorAccountId = (option ? option.id : null)
            }
        );

        if (this.queryUtility.filter.donorAccountId) {
            let params = getDonorAccountDropdownOptions;
            const donorAccount = await this.donorAccountService.get(this.queryUtility.filter.donorAccountId, params);
            let defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountSearchDropdownStore.items = donorSearchs;
        }
    }
}

export default BookletListViewStore;
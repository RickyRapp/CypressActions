import React from 'react';
import { action, observable } from 'mobx';
import { GrantService, LookupService, DonorAccountService } from "common/data";
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { GrantListFilter } from 'modules/administration/grant/models';
import { ModalParams } from 'core/models';
import { getDonorNameDropdown } from 'core/utils';
import ReactTooltip from 'react-tooltip'
import _ from 'lodash';

class GrantListViewStore extends BaseListViewStore {
    paymentTypeDropdownStore = null;
    contributionStatusDropdownStore = null;
    grantPurposeTypeModels = null;
    grantStatusModels = null;
    @observable loaded = false;

    constructor(rootStore) {
        const grantService = new GrantService(rootStore.app.baasic.apiClient);

        let filter = new GrantListFilter()
        if (rootStore.routerStore.routerState.params.donorAccountId) {
            filter.donorAccountId = rootStore.routerStore.routerState.params.donorAccountId;
        }

        super(rootStore, {
            name: 'grant',
            routes: {
                create: () => {
                    this.findDonorModalParams.open();
                }
            },
            actions: {
                find: async params => {
                    params.embed = 'createdByCoreUser,donorAccount,coreUser,grantPurposeMember';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await grantService.find(params);
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        });

        this.findDonorModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.grantStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-status');
        this.grantPurposeTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-purpose-type');

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();

        const renderGrantPurposeType = (item) => {
            let base = _.find(this.grantPurposeTypeModels, { id: item.grantPurposeTypeId }).name;

            if (item.grantPurposeTypeId === _.find(this.grantPurposeTypeModels, { abrv: 'in-memory-of' }).id ||
                item.paymentTypeId === _.find(this.grantPurposeTypeModels, { abrv: 'in-honor-of' }).id ||
                item.paymentTypeId === _.find(this.grantPurposeTypeModels, { abrv: 'sponsor-a-friend' }).id) {
                return (
                    <React.Fragment>
                        <span className='icomoon medium icon-cog' data-tip data-for={`purpose_${item.id}`}>{base}</span>
                        <ReactTooltip type='info' effect='solid' place="right" id={`purpose_${item.id}`}>
                            <span>${item.grantPurposeMember.firstName} ${item.grantPurposeMember.lastName}`</span>
                        </ReactTooltip>
                    </React.Fragment>);
            }
            else if (item.grantPurposeTypeId === _.find(this.grantPurposeTypeModels, { abrv: 'other' }).id)
                return (
                    <React.Fragment>
                        <span className='icomoon medium icon-cog' data-tip data-for={`purpose_${item.id}`}>{base}</span>
                        <ReactTooltip type='info' effect='solid' place="right" id={`purpose_${item.id}`}>
                            <span>{item.additionalInformation}</span>
                        </ReactTooltip>
                    </React.Fragment>);
            else
                return base;
        }

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'donorAccount.coreUser',
                        title: 'Donor Account',
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'amount',
                        title: 'Amount',
                        type: 'currency'
                    },
                    {
                        key: 'createdByCoreUser',
                        title: 'Created By',
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'grantStatusId',
                        title: 'Status',
                        type: 'lookup',
                        lookup: this.grantStatusModels
                    },
                    {
                        key: 'grantPurposeTypeId',
                        title: 'Purpose',
                        type: 'function',
                        function: renderGrantPurposeType
                    },
                    {
                        key: 'dateCreated',
                        title: 'Date Created',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    },
                ],
                actions: {
                },
            })
        );
    }

    @action.bound async loadLookups() {
        let grantStatusModels = await this.grantStatusLookup.getAll();
        this.grantStatusModels = grantStatusModels.data;

        let grantPurposeTypeModels = await this.grantPurposeTypeLookup.getAll();
        this.grantPurposeTypeModels = grantPurposeTypeModels.data;
    }

    @action.bound async setFilterDropdownStores() {
        this.paymentTypeDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Payment Type',
                textField: 'name',
                dataItemKey: 'id',
                isClearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.paymentTypeIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.paymentTypeModels, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );

        this.contributionStatusDropdownStore = new BaasicDropdownStore(
            {
                multi: true,
                placeholder: 'Choose Contribution Status',
                textField: 'name',
                dataItemKey: 'id',
                clearable: true
            },
            {
                onChange: (options) => this.queryUtility.filter.contributionStatusIds = (options ? _.map(options, item => { return item.id }) : null)
            },
            _.map(_.orderBy(this.contributionStatuses, ['sortOrder'], ['asc']), item => { return { id: item.id, name: item.name } })
        );

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
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address' };
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
            let params = {};
            params.embed = ['coreUser,donorAccountAddresses,address'];
            const donorAccount = await this.donorAccountService.get(this.queryUtility.filter.donorAccountId, params);
            let defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountSearchDropdownStore.items = donorSearchs;
        }
    }

    @action.bound async onChangeSearchDonor(option) {
        if (option) {
            this.rootStore.routerStore.navigate('master.app.administration.grant.create', {
                userId: option.id
            })
        }
    }
}

export default GrantListViewStore;
import { action, observable } from 'mobx';
import { GrantService, LookupService, CharityService } from "common/data";
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { GrantListFilter } from 'modules/main/grant/models';
import { renderGrantPurposeType } from 'modules/common/grant/components';
import { getCharityNameDropdown } from 'core/utils';
import { ModalParams } from 'core/models';
import _ from 'lodash';

class GrantListViewStore extends BaseListViewStore {
    grantPurposeTypeModels = null;
    donationStatusModels = null;
    @observable charitySearchDropdownStore = null;
    @observable donorAccountSearchDropdownStore = null;
    @observable grantId = null;

    constructor(rootStore) {
        const grantService = new GrantService(rootStore.app.baasic.apiClient);

        let filter = new GrantListFilter()
        if (rootStore.routerStore.routerState.queryParams) {
            if (rootStore.routerStore.routerState.queryParams.charityId) {
                filter.charityId = rootStore.routerStore.routerState.queryParams.charityId;
            }
        }

        super(rootStore, {
            name: 'grant',
            routes: {
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.main.grant.create')
                }
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'createdByCoreUser,grantPurposeMember,charity';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await grantService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        });

        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.donationStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'donation-status');
        this.grantPurposeTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-purpose-type');

        this.detailsGrantModalParams = new ModalParams({
            notifyOutsideClick: true,
            onClose: () => { this.grantId = null; this.onClose }
        });

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setFilterDropdownStores();

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'charity.name',
                        title: 'Charity'
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
                        defaultValue: 'System',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'donationStatusId',
                        title: 'Status',
                        type: 'lookup',
                        lookup: this.donationStatusModels
                    },
                    {
                        key: 'grantPurposeTypeId',
                        title: 'Purpose',
                        type: 'function',
                        function: (item) => renderGrantPurposeType(item, this.grantPurposeTypeModels)
                    },
                    {
                        key: 'dateCreated',
                        title: 'Date Created',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    },
                ],
                actions: {
                    onDetails: grant => { this.grantId = grant.id; this.detailsGrantModalParams.open(); }
                },
            })
        );
    }

    @action.bound async loadLookups() {
        let donationStatusModels = await this.donationStatusLookup.getAll();
        this.donationStatusModels = donationStatusModels.data;

        let grantPurposeTypeModels = await this.grantPurposeTypeLookup.getAll();
        this.grantPurposeTypeModels = grantPurposeTypeModels.data;
    }

    @action.bound async setFilterDropdownStores() {
        this.charitySearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Charity',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'charityAddresses,address' };
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }
                    options.charityAddressPrimary = true;

                    let response = await this.charityService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getCharityNameDropdown(x) } });
                },
                onChange: (option) => this.queryUtility.filter.charityId = (option ? option.id : null)
            }
        );

        if (this.queryUtility.filter.charityId) {
            let params = {};
            params.embed = ['charityAddresses,address'];
            const charity = await this.charityService.get(this.queryUtility.filter.charityId, params);
            let defaultCharity = { id: charity.id, name: getCharityNameDropdown(charity) }
            let charitySearchs = [];
            charitySearchs.push(defaultCharity);
            this.charitySearchDropdownStore.items = charitySearchs;
        }
    }
}

export default GrantListViewStore;
import { action, observable } from 'mobx';
import { GrantService, LookupService, DonorAccountService, CharityService } from "common/data";
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { GrantListFilter } from 'modules/administration/grant/models';
import { ModalParams } from 'core/models';
import { renderGrantPurposeType } from 'modules/common/grant/components';
import { getDonorNameDropdown, getCharityNameDropdown } from 'core/utils';
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
            if (rootStore.routerStore.routerState.queryParams.donorAccountId) {
                filter.donorAccountId = rootStore.routerStore.routerState.queryParams.donorAccountId;
            }
            if (rootStore.routerStore.routerState.queryParams.charityId) {
                filter.charityId = rootStore.routerStore.routerState.queryParams.charityId;
            }
        }

        super(rootStore, {
            name: 'grant',
            routes: {
                create: () =>
                    this.findDonorModalParams.open(),
                charityEdit: (charityId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.charity.edit', { id: charityId }),
                donorAccountEdit: (userId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: userId }),
                edit: (grantId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.grant.edit', { id: grantId })
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'createdByCoreUser,donorAccount,coreUser,grantPurposeMember,charity';
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

        this.findDonorModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.reviewGrantModalParams = new ModalParams({
            notifyOutsideClick: false,
            onClose: () => { this.grantId = null; this.onClose }
        });

        this.detailsGrantModalParams = new ModalParams({
            notifyOutsideClick: true,
            onClose: () => { this.grantId = null; this.onClose }
        });

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.donationStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'donation-status');
        this.grantPurposeTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-purpose-type');

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setFilterDropdownStores();

        const renderGrantPurposeTypeField = (item) => renderGrantPurposeType(item, this.grantPurposeTypeModels);

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
                        }],
                        onClick: grant => this.routes.donorAccountEdit(grant.donorAccount.id)
                    },
                    {
                        key: 'charity.name',
                        title: 'Charity',
                        onClick: grant => this.routes.charityEdit(grant.charity.id)
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
                        key: 'donationStatusId',
                        title: 'Status',
                        type: 'lookup',
                        lookup: this.donationStatusModels
                    },
                    {
                        key: 'grantPurposeTypeId',
                        title: 'Purpose',
                        type: 'function',
                        function: renderGrantPurposeTypeField
                    },
                    {
                        key: 'dateCreated',
                        title: 'Date Created',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    },
                ],
                actions: {
                    onReview: grant => { this.grantId = grant.id; this.reviewGrantModalParams.open(); },
                    onEdit: grant => this.routes.edit(grant.id),
                    onDetails: grant => { this.grantId = grant.id; this.detailsGrantModalParams.open(); }
                },
                actionsConfig: {
                    onReviewConfig: { statuses: _.map(_.filter(this.donationStatusModels, function (o) { return o.abrv === 'pending'; }), function (x) { return x.id }) },
                    onEditConfig: { statuses: _.map(_.filter(this.donationStatusModels, function (o) { return o.abrv === 'pending'; }), function (x) { return x.id }) }
                }
            })
        );
    }

    @action.bound async onAfterReviewGrant() {
        this.queryUtility._reloadCollection();
        this.reviewGrantModalParams.close();
    }

    @action.bound async loadLookups() {
        let donationStatusModels = await this.donationStatusLookup.getAll();
        this.donationStatusModels = donationStatusModels.data;

        let grantPurposeTypeModels = await this.grantPurposeTypeLookup.getAll();
        this.grantPurposeTypeModels = grantPurposeTypeModels.data;
    }

    @action.bound async setFilterDropdownStores() {
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

    @action.bound async onChangeSearchDonor(option) {
        if (option) {
            this.rootStore.routerStore.navigate('master.app.administration.grant.create', {
                userId: option.id
            })
        }
    }
}

export default GrantListViewStore;
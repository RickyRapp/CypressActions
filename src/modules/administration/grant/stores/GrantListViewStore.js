import React from 'react';
import { action, observable, computed } from 'mobx';
import { GrantService, DonorAccountService, CharityService, LookupService } from "common/data";
import { GrantListFilter } from 'modules/administration/grant/models';
import { ModalParams } from 'core/models';
import { BaseListViewStore, TableViewStore, BaasicDropdownStore } from 'core/stores';
import { getDonorNameDropdown, getDonorAccountDropdownOptions } from 'core/utils';
import _ from 'lodash';
import NumberFormat from 'react-number-format';

class GrantListViewStore extends BaseListViewStore {
    @observable grantPurposeTypeModels = null;
    @observable grantStatusModels = null;
    @observable grantTypeModels = null;
    @observable charitySearchDropdownStore = null;
    @observable donorAccountSearchDropdownStore = null;

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
                    this.rootStore.routerStore.navigate('master.app.administration.charity.edit', { userId: charityId }),
                donorAccountEdit: (userId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: userId }),
                edit: (grantDonorAccountId, userId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.grant-donor-account.edit', { userId: userId, id: grantDonorAccountId }),
                details: (id) =>
                    this.rootStore.routerStore.navigate('master.app.administration.grant.details', { id: id }),
                grantScheduledPaymentEdit: (grantScheduledPaymentName) =>
                    this.rootStore.routerStore.navigate('master.app.administration.grant.scheduled.list', null, { name: grantScheduledPaymentName })
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = [
                        'grantDonorAccounts',
                        'grantDonorAccounts.createdByCoreUser',
                        'grantDonorAccounts.donorAccount',
                        'grantDonorAccounts.donorAccount.coreUser',
                        'grantDonorAccounts.donorAccount.companyProfile',
                        'charity'
                    ];
                    // params.fields = [
                    //     'id',
                    //     'dateCreated',
                    //     'grantStatusId',
                    //     'grantTypeId',
                    //     'confirmationNumber',
                    //     'description',
                    //     'grantStatusId',
                    //     'grantPurposeTypeId',
                    //     'grantPurposeMember',
                    //     'grantPurposeMember.name',
                    //     'grantScheduledPayment',
                    //     'grantScheduledPayment.name',
                    //     'createdByCoreUser',
                    //     'createdByCoreUser.firstName',
                    //     'createdByCoreUser.lastName',
                    //     'donorAccount',
                    //     'donorAccountId',
                    //     'donorAccount.id',
                    //     'donorAccount.donorName',
                    //     'charity',
                    //     'charity.id',
                    //     'charity.name',
                    // ];
                    const response = await grantService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        });

        this.rootStore = rootStore;
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.grantStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-status');
        this.grantPurposeTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-purpose-type');
        this.grantTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-type');

        this.findDonorModalParams = new ModalParams({
            onClose: this.onClose
        });

        this.detailsModalParams = new ModalParams({
            notifyOutsideClick: true,
            onClose: this.onClose
        });

        this.reviewModalParams = new ModalParams({
            onClose: () => { this.onClose }
        });

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        this.setStores();

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'charity.name',
                        title: 'CHARITY',
                        onClick: (item) => this.routes.charityEdit(item.charity.id)
                    },
                    {
                        key: 'amount',
                        title: 'AMOUNT',
                        type: 'function',
                        function: (item) => <NumberFormat value={_.sumBy(item.grantDonorAccounts, 'amount')} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix='$' />
                    },
                    {
                        key: 'grantStatusId',
                        title: 'STATUS',
                        type: 'function',
                        function: (item) => _.find(this.grantStatusModels, { id: item.grantStatusId }).name
                    },
                    {
                        key: 'grantTypeId',
                        title: 'TYPE',
                        type: 'function',
                        function: (item) => _.find(this.grantTypeModels, { id: item.grantTypeId }).name
                    },
                    {
                        key: 'dateCreated',
                        title: 'DATECREATED',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    },
                ],
                actions: {
                    onReview: (item) => { this.reviewModalParams.open(item.id); },
                    onEdit: (item) => this.routes.edit(item.grantDonorAccounts[0].id, item.grantDonorAccounts[0].donorAccountId),
                    onDetails: (item) => item.grantTypeId === this.regularGrantTypeId ? this.detailsModalParams.open(item.grantDonorAccounts[0].id) : this.routes.details(item.id)
                },
                actionsRender: {
                    renderReview: this.renderReview,
                    renderEdit: this.renderEdit,
                }
            })
        );
    }

    @action.bound async loadLookups() {
        let grantStatusModels = await this.grantStatusLookup.getAll();
        this.grantStatusModels = grantStatusModels.data;

        let grantPurposeTypeModels = await this.grantPurposeTypeLookup.getAll();
        this.grantPurposeTypeModels = grantPurposeTypeModels.data;

        let grantTypeModels = await this.grantTypeLookup.getAll();
        this.grantTypeModels = grantTypeModels.data;
    }

    @action.bound async setStores() {
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
                    let options = getCharityDropdownOptions;
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    let response = await this.charityService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getCharityNameDropdown(x) } });
                },
                onChange: (option) => this.queryUtility.filter.charityId = (option ? option.id : null)
            }
        );

        if (this.queryUtility.filter.charityId) {
            let params = getCharityDropdownOptions;
            const charity = await this.charityService.get(this.queryUtility.filter.charityId, params);
            let defaultCharity = { id: charity.id, name: getCharityNameDropdown(charity) }
            let charitySearchs = [];
            charitySearchs.push(defaultCharity);
            this.charitySearchDropdownStore.items = charitySearchs;
        }
    }

    @action.bound renderReview(grant) {
        const statusesForReview = _.map(_.filter(this.grantStatusModels, function (o) { return o.abrv === 'pending'; }), function (x) { return x.id });
        return _.some(statusesForReview, (item) => { return item === grant.grantStatusId });
    }

    @action.bound renderEdit(grant) {
        const statusesForEdit = _.map(_.filter(this.grantStatusModels, function (o) { return o.abrv === 'pending'; }), function (x) { return x.id });
        if (_.some(statusesForEdit, (item) => { return item === grant.grantStatusId })) {
            return grant.grantTypeId === this.regularGrantTypeId;
        }
        return false;
    }

    @action.bound async onAfterReviewGrant() {
        this.queryUtility._reloadCollection();
        this.reviewModalParams.close();
    }

    @action.bound onChangeSearchDonor(option) {
        this.rootStore.routerStore.navigate('master.app.administration.grant-donor-account.create', { userId: option.id });
    }

    @computed get regularGrantTypeId() {
        return this.grantTypeModels ? _.find(this.grantTypeModels, { abrv: 'regular' }).id : null;
    }
}

export default GrantListViewStore;
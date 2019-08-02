import React from 'react';
import { action, observable, computed } from 'mobx';
import { GrantDonorAccountService, DonorAccountService, CharityService, LookupService } from "common/data";
import { GrantCombinedListFilter } from 'modules/administration/grant/models';
import { ModalParams } from 'core/models';
import { BaseListViewStore, TableViewStore, BaasicDropdownStore } from 'core/stores';
import { getDonorNameDropdown, getDonorAccountDropdownOptions } from 'core/utils';
import _ from 'lodash';
import NumberFormat from 'react-number-format';

class GrantCombinedListViewStore extends BaseListViewStore {
    @observable grantPurposeTypeModels = null;
    @observable grantStatusModels = null;
    @observable grantTypeModels = null;
    @observable donorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const grantDonorAccountService = new GrantDonorAccountService(rootStore.app.baasic.apiClient);

        let filter = new GrantCombinedListFilter()
        filter.grantId = rootStore.routerStore.routerState.params.id;
        if (rootStore.routerStore.routerState.queryParams) {
            if (rootStore.routerStore.routerState.queryParams.donorAccountId) {
                filter.donorAccountId = rootStore.routerStore.routerState.queryParams.donorAccountId;
            }
        }

        super(rootStore, {
            name: 'grant',
            routes: {
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
                        'grant',
                        'grant.grantStatus',
                        'grant.charity',
                        'createdByCoreUser',
                        'donorAccount',
                        'donorAccount.coreUser',
                        'donorAccount.companyProfile',
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
                    const response = await grantDonorAccountService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true
            }
        });

        this.rootStore = rootStore;
        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.grantStatusLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-status');
        this.grantPurposeTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-purpose-type');

        this.detailsModalParams = new ModalParams({
            notifyOutsideClick: true,
            onClose: this.onClose
        });

        this.reviewModalParams = new ModalParams({
            onClose: () => { this.onClose }
        });

        this.setStores();

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'donorAccount.donorName',
                        title: 'DONOR',
                        onClick: (item) => this.routes.donorAccountEdit(item.donorAccount.id)
                    },
                    {
                        key: 'amount',
                        title: 'AMOUNT',
                        type: 'function',
                        function: (item) => <NumberFormat value={item.amount} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix='$' />
                    },
                    {
                        key: 'confirmationNumber',
                        title: 'CONFIRMATIONNUMBER'
                    },
                    {
                        key: 'dateCreated',
                        title: 'DATECREATED',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    }
                ],
                actions: {
                    onEdit: (item) => this.routes.edit(item.id, item.donorAccount.id),
                    onDetails: (item) => this.detailsModalParams.open(item.id)
                },
                actionsRender: {
                    renderEdit: (item) => item.grant.grantStatus.abrv === 'pending',
                }
            })
        );
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
            const params = getDonorAccountDropdownOptions;
            const donorAccount = await this.donorAccountService.get(this.queryUtility.filter.donorAccountId, params);
            const defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountSearchDropdownStore.items = donorSearchs;
        }
    }
}

export default GrantCombinedListViewStore;
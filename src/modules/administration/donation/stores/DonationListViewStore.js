import React from 'react';
import { action, observable, computed } from 'mobx';
import { DonationService, DonorAccountService, CharityService } from "common/data";
import { DonationListFilter } from 'modules/administration/donation/models';
import { ModalParams } from 'core/models';
import { BaseListViewStore, TableViewStore, BaasicDropdownStore } from 'core/stores';
import { getDonorNameDropdown, getDonorAccountDropdownOptions, getCharityNameDropdown, getCharityDropdownOptions } from 'core/utils';
import _ from 'lodash';
import NumberFormat from 'react-number-format';

class DonationListViewStore extends BaseListViewStore {
    @observable charitySearchDropdownStore = null;
    @observable donorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const donationService = new DonationService(rootStore.app.baasic.apiClient);

        let filter = new DonationListFilter()
        if (rootStore.routerStore.routerState.queryParams) {
            if (rootStore.routerStore.routerState.queryParams.donorAccountId) {
                filter.donorAccountId = rootStore.routerStore.routerState.queryParams.donorAccountId;
            }
            if (rootStore.routerStore.routerState.queryParams.charityId) {
                filter.charityId = rootStore.routerStore.routerState.queryParams.charityId;
            }
        }

        super(rootStore, {
            name: 'donation',
            routes: {
                charityEdit: (charityId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.charity.edit', { userId: charityId }),
                donorAccountEdit: (userId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: userId }),
                edit: (grantId, userId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.grant-donor-account.edit', { userId: userId, id: grantId }),
                details: (id) =>
                    this.rootStore.routerStore.navigate('master.app.administration.grant.combined-list', { id: id })
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = [
                        'grants',
                        'grants.donorAccount',
                        'grants.donorAccount.coreUser',
                        'grants.donorAccount.companyProfile',
                        'charity',
                        'donationType',
                        'donationStatus'
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
                    const response = await donationService.find(params);
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
                        function: (item) => <NumberFormat value={_.sumBy(item.grants, 'amount')} displayType={'text'} thousandSeparator={true} decimalScale={2} fixedDecimalScale={true} prefix='$' />
                    },
                    {
                        key: 'donationStatus.name',
                        title: 'STATUS'
                    },
                    {
                        key: 'donationType.name',
                        title: 'TYPE'
                    },
                    {
                        key: 'dateCreated',
                        title: 'DATECREATED',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
                    },
                ],
                actions: {
                    onReview: (item) => this.reviewModalParams.open(item.id),
                    onEdit: (item) => this.routes.edit(item.grants[0].id, item.grants[0].donorAccountId),
                    onDetails: (item) => item.donationType.abrv === 'regular' ? this.detailsModalParams.open(item.grants[0].id) : this.routes.details(item.id)
                },
                actionsRender: {
                    renderReview: (item) => item.donationStatus.abrv === 'pending',
                    renderEdit: (item) => item.donationStatus.abrv === 'pending' && item.donationType.abrv === 'regular',
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

    @action.bound async onAfterReview() {
        this.queryUtility._reloadCollection();
        this.reviewModalParams.close();
    }

    @action.bound onChangeSearchDonor(option) {
        this.rootStore.routerStore.navigate('master.app.administration.grant-donor-account.create', { userId: option.id });
    }
}

export default DonationListViewStore;
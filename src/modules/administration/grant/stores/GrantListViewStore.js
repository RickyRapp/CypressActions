import React from 'react';
import { action, observable, computed } from 'mobx';
import { GrantService, DonorAccountService, CharityService } from "common/data";
import { GrantListFilter } from 'modules/administration/grant/models';
import { renderGrantPurposeType } from 'modules/common/grant/components';
import { ModalParams } from 'core/models';
import { BaseListViewStore, TableViewStore, BaasicDropdownStore } from 'core/stores';
import { getDonorNameDropdown, getDonorAccountDropdownOptions, getCharityDropdownOptions, getCharityNameDropdown } from 'core/utils';
import _ from 'lodash';

class GrantListViewStore extends BaseListViewStore {
    @observable charitySearchDropdownStore = null;
    @observable donorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const grantService = new GrantService(rootStore.app.baasic.apiClient);

        let filter = new GrantListFilter()
        filter.orderBy = 'dateCreated';
        filter.orderDirection = 'desc';
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
                    this.rootStore.routerStore.navigate('master.app.administration.grant.edit', { userId: userId, id: grantDonorAccountId }),
                grantScheduledPaymentEdit: (grantScheduledPaymentName) =>
                    this.rootStore.routerStore.navigate('master.app.administration.grant.scheduled.list', null, { name: grantScheduledPaymentName })
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = [
                        'donation',
                        'donation.donationStatus',
                        'donation.charity',
                        'grantPurposeType',
                        'createdByCoreUser',
                        'donorAccount',
                        'donorAccount.coreUser',
                        'donorAccount.companyProfile',
                        'grantStatus'
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
                },
                cancel: async grantId => {
                    return await grantService.cancel(grantId);
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
                        key: 'donation.charity.name',
                        title: 'CHARITY',
                        onClick: (item) => this.routes.charityEdit(item.donation.charity.id)
                    },
                    {
                        key: 'amount',
                        title: 'AMOUNT',
                        type: 'currency',
                        onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
                    },
                    {
                        key: 'grantStatus.name',
                        title: 'STATUS'
                    },
                    {
                        key: 'grant.grantPurposeType',
                        title: 'PURPOSETYPE',
                        type: 'function',
                        function: (item) => renderGrantPurposeType(item)
                    },
                    {
                        key: 'createdByCoreUser',
                        title: 'BY',
                        type: 'function',
                        function: (item) => item.createdByCoreUser ?
                            (item.createdByCoreUser.userId === item.donorAccountId ? item.donorAccount.donorName : `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}`)
                            :
                            'System'
                    },
                    {
                        key: 'dateCreated',
                        title: 'DATECREATED',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm',
                        onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
                    },
                ],
                actions: {
                    onEdit: (item) => this.routes.edit(item.id, item.donorAccount.id),
                    onDetails: (item) => this.detailsModalParams.open(item.id),
                    onCancel: (item) => this.cancelGrant(item.id),
                },
                actionsRender: {
                    renderEdit: (item) => item.grantStatus.abrv === 'pending',
                    renderCancel: (item) => item.grantStatus.abrv === 'pending'
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

                    try {
                        let response = await this.donorAccountService.search(options);
                        return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                    } catch (ex) {
                        this.rootStore.notificationStore.showMessageFromResponse(ex);
                    }
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

                    try {
                        let response = await this.charityService.search(options);
                        return _.map(response.item, x => { return { id: x.id, name: getCharityNameDropdown(x) } });
                    } catch (ex) {
                        this.rootStore.notificationStore.showMessageFromResponse(ex);
                    }
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

    @action.bound onChangeSearchDonor(option) {
        this.rootStore.routerStore.navigate('master.app.administration.grant.create', { userId: option.id });
    }

    @action.bound async cancelGrant(grantId) {
        this.rootStore.modalStore.showConfirm(
            'AREYOUSUREYOUWANTTOCANCELGRANT',
            async () => {
                this.loaderStore.suspend();
                try {
                    await this.actions.cancel(grantId);
                } catch (ex) {
                    this.rootStore.notificationStore.showMessageFromResponse(ex);
                }
                this.queryUtility.fetch();
                this.rootStore.notificationStore.success('SUCCESSFULLYCANCELED');
                this.loaderStore.resume();
            }
        );
    }
}

export default GrantListViewStore;
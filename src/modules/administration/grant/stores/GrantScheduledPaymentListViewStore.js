import { action, observable } from 'mobx';
import { GrantScheduledPaymentService, LookupService, DonorAccountService, CharityService } from "common/data";
import { BaasicDropdownStore, BaseListViewStore, TableViewStore } from "core/stores";
import { GrantScheduledPaymentListFilter } from 'modules/administration/grant/models';
import { ModalParams } from 'core/models';
import { renderGrantPurposeType, renderGrantScheduleType } from 'modules/common/grant/components';
import { getDonorNameDropdown, getCharityNameDropdown } from 'core/utils';
import _ from 'lodash';

class GrantScheduledPaymentListViewStore extends BaseListViewStore {
    grantPurposeTypeModels = null;
    grantScheduleTypeModels = null;
    @observable charitySearchDropdownStore = null;
    @observable donorAccountSearchDropdownStore = null;
    @observable grantId = null;

    constructor(rootStore) {
        const grantScheduledPaymentService = new GrantScheduledPaymentService(rootStore.app.baasic.apiClient);

        let filter = new GrantScheduledPaymentListFilter()
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
                charityEdit: (charityId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.charity.edit', { id: charityId }),
                donorAccountEdit: (userId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: userId }),
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'createdByCoreUser,donorAccount,coreUser,charity';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await grantScheduledPaymentService.find(params);
                    this.loaderStore.resume();
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        });

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.charityService = new CharityService(rootStore.app.baasic.apiClient);
        this.grantScheduleTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-schedule-type');
        this.grantPurposeTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'grant-purpose-type');
        this.grantScheduledPaymentService = grantScheduledPaymentService;

        this.load();
    }

    @action.bound async load() {
        await this.loadLookups();
        await this.setFilterDropdownStores();

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'donorAccount.coreUser',
                        title: 'Donor Account (click on row)',
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
                        key: 'name',
                        title: 'Name'
                    },
                    {
                        key: 'done',
                        title: 'Done',
                        type: 'function',
                        function: (item) => item.done ? 'Yes' : 'No'
                    },
                    {
                        key: 'charity.name',
                        title: 'Charity (click on row)',
                        onClick: grant => this.routes.charityEdit(grant.charity.id)
                    },
                    {
                        key: 'amount',
                        title: 'Amount',
                        type: 'currency'
                    },
                    {
                        key: 'dateCreated',
                        title: 'Date Created',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm'
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
                        key: 'grantScheduleTypeId',
                        title: 'Type',
                        type: 'function',
                        function: (item) => renderGrantScheduleType(item, this.grantScheduleTypeModels)
                    },
                ],
                actions: {
                    onCancel: grantScheduledPayment => this.onCancel(grantScheduledPayment.id, grantScheduledPayment.name)
                },
                actionsRender: {
                    renderCancel: (grantScheduledPayment) => !grantScheduledPayment.done
                }
            })
        );
    }

    @action.bound async loadLookups() {
        const grantScheduleTypeModels = await this.grantScheduleTypeLookup.getAll();
        this.grantScheduleTypeModels = grantScheduleTypeModels.data;

        const grantPurposeTypeModels = await this.grantPurposeTypeLookup.getAll();
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

    @action.bound async onCancel(id, name) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to cancel: ${name} - scheduled grant?`,
            async () => {
                this.loaderStore.suspend();
                let response = null;
                try {
                    response = await this.grantScheduledPaymentService.cancel(id);
                    await this.queryUtility._reloadCollection();
                } catch (error) {
                    response = error;
                }
                this.rootStore.notificationStore.showMessageFromResponse(response);
                this.loaderStore.resume();
            }
        );
    }
}

export default GrantScheduledPaymentListViewStore;
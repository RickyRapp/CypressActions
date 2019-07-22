import { observable } from 'mobx';
import { GrantScheduledPaymentService, DonorAccountService } from "common/data";
import { BaasicDropdownStore } from "core/stores";
import { getDonorAccountDropdownOptions } from "core/utils";
import { GrantScheduledPaymentListFilter } from 'modules/administration/grant/models';
import { renderGrantScheduleType } from 'modules/common/grant/components';
import { BaseGrantScheduledPaymentListViewStore } from 'modules/common/grant/stores';
import _ from 'lodash';

class GrantScheduledPaymentListViewStore extends BaseGrantScheduledPaymentListViewStore {
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

        const listViewStore = {
            name: 'scheduled grant',
            routes: {
                charityEdit: (charityId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.charity.edit', { userId: charityId }),
                donorAccountEdit: (userId) =>
                    this.rootStore.routerStore.navigate('master.app.administration.donor-account.edit', { userId: userId }),
            },
            actions: {
                find: async params => {
                    this.loaderStore.suspend();
                    params.embed = 'createdByCoreUser,donorAccount,coreUser,charity,companyProfile';
                    const response = await grantScheduledPaymentService.find(params);
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

        this.setColumns = [
            {
                key: 'donorAccount.coreUser',
                title: 'DONOR',
                type: 'function',
                function: (item) => { return `${item.donorAccount.coreUser.firstName} ${item.donorAccount.coreUser.lastName}` },
                onClick: grant => this.routes.donorAccountEdit(grant.donorAccount.id),
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'charity.name',
                title: 'CHARITY',
                onClick: grant => this.routes.charityEdit(grant.charity.id),
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'done',
                title: 'DONE',
                type: 'bool'
            },
            {
                key: 'name',
                title: 'NAME',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'amount',
                title: 'AMOUNT',
                type: 'currency',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'grantScheduleTypeId',
                title: 'TYPE',
                type: 'function',
                function: (item) => renderGrantScheduleType(item, this.grantScheduleTypeModels)
            },
            {
                key: 'startFutureDate',
                title: 'STARTDATE',
                type: 'date',
                format: 'YYYY-MM-DD',
                withoutTimeZone: true,
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'nextDate',
                title: 'NEXTDATE',
                type: 'date',
                renderIf: (item) => item.grantScheduleTypeId !== _.find(this.grantScheduleTypeModels, { abrv: 'one-time' }).id,
                default: '',
                format: 'YYYY-MM-DD',
                withoutTimeZone: true,
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'dateCreated',
                title: 'DATECREATED',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm',
                onHeaderClick: (column) => this.queryUtility.changeOrder(column.key)
            },
            {
                key: 'createdByCoreUser',
                title: 'BY',
                type: 'function',
                function: (item) => { return item.createdByCoreUser ? `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}` : 'System' }
            }
        ];

        this.setRenderActions = {
            renderCancel: (item) => !item.done
        }

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
    }

    async setFilterDropdownStores() {
        super.setFilterDropdownStores();
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
            let params = {};
            params.embed = ['coreUser,donorAccountAddresses,address,companyProfile'];
            const donorAccount = await this.donorAccountService.get(this.queryUtility.filter.donorAccountId, params);
            let defaultSearchDonor = { id: donorAccount.id, name: getDonorNameDropdown(donorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSearchDonor);
            this.donorAccountSearchDropdownStore.items = donorSearchs;
        }
    }
}

export default GrantScheduledPaymentListViewStore;
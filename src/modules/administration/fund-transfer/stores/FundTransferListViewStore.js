import { action, observable } from 'mobx';
import { FundTransferService, DonorAccountService } from "common/data";
import { BaasicDropdownStore } from 'core/stores';
import { getDonorNameDropdown } from 'core/utils';
import { FundTransferListFilter } from 'modules/administration/fund-transfer/models';
import { BaseFundTransferListViewStore } from 'modules/common/fund-transfer/stores';
import _ from 'lodash';

class FundTransferListViewStore extends BaseFundTransferListViewStore {
    @observable recipientDonorAccountSearchDropdownStore = null;
    @observable senderDonorAccountSearchDropdownStore = null;

    constructor(rootStore) {
        const fundTransferService = new FundTransferService(rootStore.app.baasic.apiClient);
        let filter = new FundTransferListFilter()
        if (rootStore.routerStore.routerState.queryParams && rootStore.routerStore.routerState.queryParams.senderDonorAccountId) {
            filter.senderDonorAccountId = rootStore.routerStore.routerState.queryParams.senderDonorAccountId;
        }

        const listViewStore = {
            name: 'fund transfer',
            routes: {
                create: () => {
                    this.rootStore.routerStore.navigate('master.app.administration.fund-transfer.create')
                }
            },
            actions: {
                find: async params => {
                    params.embed = 'senderDonorAccount,recipientDonorAccount,coreUser,createdByCoreUser';
                    params.orderBy = 'dateCreated';
                    params.orderDirection = 'desc';
                    const response = await fundTransferService.find(params);
                    return response;
                }
            },
            queryConfig: {
                filter: filter
            }
        };

        const setColumns = [
            {
                key: 'amount',
                title: 'AMOUNT',
                type: 'currency',
            },
            {
                key: 'senderDonorAccount.coreUser',
                title: 'SENDER',
                type: 'function',
                function: (item) => { return `${item.senderDonorAccount.coreUser.firstName} ${item.senderDonorAccount.coreUser.lastName}` }
            },
            {
                key: 'recipientDonorAccount.coreUser',
                title: 'RECIPIENT',
                type: 'function',
                function: (item) => { return `${item.recipientDonorAccount.coreUser.firstName} ${item.recipientDonorAccount.coreUser.lastName}` }
            },
            {
                key: 'description',
                title: 'DESCRIPTION'
            },
            {
                key: 'createdByCoreUser',
                title: 'BY',
                type: 'object',
                type: 'function',
                function: (item) => { return `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}` }
            },
            {
                key: 'dateCreated',
                title: 'DATECREATED',
                type: 'date',
                format: 'YYYY-MM-DD HH:mm'
            },
        ];

        const config = {
            listViewStore: listViewStore,
            setColumns: setColumns
        };

        super(rootStore, config);

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);
        this.senderDonorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Sender',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address,companyProfile' };
                    options.exceptId = this.queryUtility.filter.recipientDonorAccountId;
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    const response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: (option) => this.queryUtility.filter.senderDonorAccountId = (option ? option.id : null)
            }
        );

        if (this.queryUtility.filter.senderDonorAccountId) {
            this.setSenderDropdownStore(this.queryUtility.filter.senderDonorAccountId, true)
        }

        this.recipientDonorAccountSearchDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                placeholder: 'Choose Recipient',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address,companyProfile' };
                    options.exceptId = this.queryUtility.filter.senderDonorAccountId;
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    const response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: (option) => this.queryUtility.filter.recipientDonorAccountId = (option ? option.id : null)
            }
        );
    }

    @action.bound async switchDonorAccountsFromFilter() {
        if (this.queryUtility.filter.senderDonorAccountId && this.queryUtility.filter.recipientDonorAccountId) {
            const senderId = this.queryUtility.filter.senderDonorAccountId;
            const recipientId = this.queryUtility.filter.recipientDonorAccountId;

            this.queryUtility.filter.senderDonorAccountId = null;
            this.queryUtility.filter.recipientDonorAccountId = null;

            const params = {};
            params.embed = ['coreUser,donorAccountAddresses,address,companyProfile'];
            const senderDonorAccount = await this.donorAccountService.get(recipientId, params);
            let defaultSenderSearchDonor = { id: senderDonorAccount.id, name: getDonorNameDropdown(senderDonorAccount) }
            let donorSearchs = [];
            donorSearchs.push(defaultSenderSearchDonor);
            this.senderDonorAccountSearchDropdownStore.items = donorSearchs;
            this.queryUtility.filter.senderDonorAccountId = recipientId;

            const recipientDonorAccount = await this.donorAccountService.get(senderId, params);
            let defaultRecipientSearchDonor = { id: recipientDonorAccount.id, name: getDonorNameDropdown(recipientDonorAccount) }
            donorSearchs = [];
            donorSearchs.push(defaultRecipientSearchDonor);
            this.recipientDonorAccountSearchDropdownStore.items = donorSearchs;
            this.queryUtility.filter.recipientDonorAccountId = senderId;
        }
    }

    @action.bound async setSenderDropdownStore(donorAccountId, initSet = false) {
        if (initSet || (!this.queryUtility.filter.senderDonorAccountId && this.queryUtility.filter.recipientDonorAccountId)) {
            const recipientId = donorAccountId;

            this.queryUtility.filter.recipientDonorAccountId = null;

            const params = {};
            params.embed = ['coreUser,donorAccountAddresses,address,companyProfile'];
            const senderDonorAccount = await this.donorAccountService.get(recipientId, params);
            let defaultsenderSearchDonor = { id: senderDonorAccount.id, name: getDonorNameDropdown(senderDonorAccount) }
            const donorSearchs = [];
            donorSearchs.push(defaultsenderSearchDonor);
            this.senderDonorAccountSearchDropdownStore.items = donorSearchs;
            this.queryUtility.filter.senderDonorAccountId = recipientId;

        }
    }

    @action.bound async setRecipientDropdownStore(donorAccountId) {
        if (this.queryUtility.filter.senderDonorAccountId && !this.queryUtility.filter.recipientDonorAccountId) {
            const senderId = donorAccountId;

            this.queryUtility.filter.senderDonorAccountId = null;

            const params = {};
            params.embed = ['coreUser,donorAccountAddresses,address,companyProfile'];
            const recipientDonorAccount = await this.donorAccountService.get(senderId, params);
            let defaultRecipientSearchDonor = { id: recipientDonorAccount.id, name: getDonorNameDropdown(recipientDonorAccount) }
            const donorSearchs = [];
            donorSearchs.push(defaultRecipientSearchDonor);
            this.recipientDonorAccountSearchDropdownStore.items = donorSearchs;
            this.queryUtility.filter.recipientDonorAccountId = senderId;
        }
    }

}

export default FundTransferListViewStore;
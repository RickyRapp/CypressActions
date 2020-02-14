import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { applicationContext, donorAccountFormatter } from 'core/utils';
import { FundTransferCreateForm } from 'application/fund-transfer/forms';
import { FundTransferService } from 'application/fund-transfer/services';
import { DonorAccountService } from 'application/donor-account/services';
import _ from 'lodash';
import { observable, action } from 'mobx';

@applicationContext
class FundTransferCreateViewStore extends BaseEditViewStore {
    @observable recipientDonorAccount = null;
    @observable senderDonorAccount = null;
    @observable setErrorInsuficientFunds = null;

    constructor(rootStore) {
        const service = new FundTransferService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'fund-transfer-create',
            id: undefined,
            autoInit: true,
            actions: () => {
                return {
                    create: async (resource) => {
                        return await service.create(resource);
                    }
                }
            },
            FormClass: FundTransferCreateForm,
        });

        const donorAccountService = new DonorAccountService(rootStore.application.baasic.apiClient);
        this.senderDonorAccountDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorAccountService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        exceptId: this.recipientDonorAccountDropdownStore.value ? this.recipientDonorAccountDropdownStore.value.id : null,
                        embed: [
                            'donorAccountAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAccountAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: donorAccountFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                onChange: async (senderDonorAccountId) => {
                    if (this.recipientDonorAccountDropdownStore.has(senderDonorAccountId)) {
                        const array = this.recipientDonorAccountDropdownStore.filteredItems;
                        _.remove(array, { id: senderDonorAccountId });
                        this.recipientDonorAccountDropdownStore.setFilteredItems(array);
                    }
                    this.senderDonorAccount = await this.fetchDonorAccount(senderDonorAccountId);
                    this.form.$('amount').set('rules', `required|numeric|min:0|max:${this.senderDonorAccount.presentBalance > 0 ? this.senderDonorAccount.presentBalance : 0}`)
                    this.setErrorInsuficientFunds = this.senderDonorAccount.presentBalance <= 0;
                }
            });
        this.recipientDonorAccountDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorAccountService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        exceptId: this.senderDonorAccountDropdownStore.value ? this.senderDonorAccountDropdownStore.value.id : null,
                        embed: [
                            'donorAccountAddresses',
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAccountAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: donorAccountFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                onChange: async (recipientDonorAccountId) => {
                    if (this.senderDonorAccountDropdownStore.has(recipientDonorAccountId)) {
                        const array = this.senderDonorAccountDropdownStore.filteredItems;
                        _.remove(array, { id: recipientDonorAccountId });
                        this.senderDonorAccountDropdownStore.setFilteredItems(array);
                    }
                    this.recipientDonorAccount = await this.fetchDonorAccount(recipientDonorAccountId);

                }
            });
    }

    @action.bound
    async fetchDonorAccount(donorAccountId) {
        const service = new DonorAccountService(this.rootStore.application.baasic.apiClient);
        const response = await service.get(donorAccountId, {
            embed: [
                'coreUser',
                'companyProfile',
                'donorAccountAddresses',
                'donorAccountAddresses.address',
                'presentBalance',
                'availableBalance'
            ],
            fields: [
                'donorName',
                'accountTypeId',
                'availableBalance',
                'presentBalance'
            ]
        });

        return response.data;
    }
}

export default FundTransferCreateViewStore;

import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { applicationContext, donorFormatter } from 'core/utils';
import { FundTransferCreateForm } from 'application/fund-transfer/forms';
import { FundTransferService } from 'application/fund-transfer/services';
import { DonorService } from 'application/donor/services';
import _ from 'lodash';
import { observable, action } from 'mobx';

@applicationContext
class FundTransferCreateViewStore extends BaseEditViewStore {
    @observable recipientDonor = null;
    @observable senderDonor = null;
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

        const donorService = new DonorService(rootStore.application.baasic.apiClient);
        this.senderDonorDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        exceptId: this.recipientDonorDropdownStore.value ? this.recipientDonorDropdownStore.value.id : null,
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                onChange: async (senderDonorId) => {
                    if (this.recipientDonorDropdownStore.has(senderDonorId)) {
                        const array = this.recipientDonorDropdownStore.filteredItems;
                        _.remove(array, { id: senderDonorId });
                        this.recipientDonorDropdownStore.setFilteredItems(array);
                    }
                    this.senderDonor = await this.fetchDonor(senderDonorId);
                    this.form.$('amount').set('rules', `required|numeric|min:0|max:${this.senderDonor.presentBalance > 0 ? this.senderDonor.presentBalance : 0}`)
                    this.setErrorInsuficientFunds = this.senderDonor.presentBalance <= 0;
                }
            });
        this.recipientDonorDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const response = await donorService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'coreUser.firstName|asc',
                        exceptId: this.senderDonorDropdownStore.value ? this.senderDonorDropdownStore.value.id : null,
                        embed: [
                            'donorAddresses',
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return _.map(response.data.item, x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                onChange: async (recipientDonorId) => {
                    if (this.senderDonorDropdownStore.has(recipientDonorId)) {
                        const array = this.senderDonorDropdownStore.filteredItems;
                        _.remove(array, { id: recipientDonorId });
                        this.senderDonorDropdownStore.setFilteredItems(array);
                    }
                    this.recipientDonor = await this.fetchDonor(recipientDonorId);

                }
            });
    }

    @action.bound
    async fetchDonor(donorId) {
        const service = new DonorService(this.rootStore.application.baasic.apiClient);
        const response = await service.get(donorId, {
            embed: [
                'coreUser',
                'companyProfile',
                'donorAddresses',
                'donorAddresses.address',
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

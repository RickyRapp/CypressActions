import { action, observable } from 'mobx';
import { FundTransferCreateForm } from 'modules/administration/fund-transfer/forms';
import { FundTransferService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { getDonorNameDropdown, getDonorAccountDropdownOptions } from 'core/utils';
import _ from 'lodash';

class FundTransferCreateViewStore extends BaseEditViewStore {
    @observable senderDonorAccountDropdownStore = null;
    @observable senderDonorAccount = null;
    @observable recipientDonorAccountDropdownStore = null;
    @observable recipientDonorAccount = null;

    constructor(rootStore) {
        const fundTransferService = new FundTransferService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'fund transfer',
            actions: {
                create: async (item) => {
                    return await fundTransferService.create(item);
                }
            },
            FormClass: FundTransferCreateForm
        });

        this.donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        this.senderDonorAccountDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = getDonorAccountDropdownOptions;
                    options.exceptId = this.recipientDonorAccount ? this.recipientDonorAccount.id : null;
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    const response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: this.onChangeSenderDonorAccount
            }
        );

        this.recipientDonorAccountDropdownStore = new BaasicDropdownStore(
            {
                multi: false,
                textField: 'name',
                dataItemKey: 'id',
                clearable: true,
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = getDonorAccountDropdownOptions;
                    options.exceptId = this.senderDonorAccount ? this.senderDonorAccount.id : null;
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    const response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: this.onChangeRecipientDonorAccount
            }
        );
    }

    @action.bound async onChangeSenderDonorAccount(option) {
        if (option) {
            this.form.$('senderDonorAccountId').set('value', option.id);
            let params = {
                embed: 'coreUser,companyProfile',
                fields: [
                    'id',
                    'availableBalance',
                    'presentBalance',
                    'donorName'
                ]
            }
            const response = await this.donorAccountService.get(option.id, params);
            this.senderDonorAccount = response;
            this.form.$('amount').set('rules', `required|numeric|min:0|max:${this.senderDonorAccount.availableBalance}`)
        }
        else {
            this.senderDonorAccount = null;
            this.form.$('senderDonorAccountId').set('value', null);
            this.form.$('amount').set('rules', `required|numeric|min:0`);
        }
    }

    @action.bound async onChangeRecipientDonorAccount(option) {
        if (option) {
            this.form.$('recipientDonorAccountId').set('value', option.id);
            let params = {
                embed: 'coreUser,companyProfile',
                fields: [
                    'id',
                    'availableBalance',
                    'presentBalance',
                    'donorName'
                ]
            }
            const response = await this.donorAccountService.get(option.id, params);
            this.recipientDonorAccount = response;
        }
        else {
            this.recipientDonorAccount = null;
            this.form.$('recipientDonorAccountId').set('value', null);
        }
    }
}

export default FundTransferCreateViewStore;
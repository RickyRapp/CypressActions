import { action, observable } from 'mobx';
import { FundTransferCreateForm } from 'modules/main/fund-transfer/forms';
import { FundTransferService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { getDonorNameDropdown } from 'core/utils';
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
                create: async fundTransfer => {
                    try {
                        return await fundTransferService.create(fundTransfer);
                    } catch (errorResponse) {
                        return errorResponse;
                    }
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
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address' };
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
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address' };
                    options.exceptId = this.senderDonorAccount ? this.senderDonorAccount.id : null;
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    const response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: this.onChangerecipientDonorAccount
            }
        );
    }

    @action.bound async onChangeSenderDonorAccount(option) {
        if (option) {
            this.form.$('senderDonorAccountId').set('value', option.id);
            let params = {};
            params.embed = ['coreUser'];
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

    @action.bound async onChangerecipientDonorAccount(option) {
        if (option) {
            this.form.$('recipientDonorAccountId').set('value', option.id);
            let params = {};
            params.embed = ['coreUser'];
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
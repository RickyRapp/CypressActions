import { action, observable } from 'mobx';
import { FundTransferCreateForm } from 'modules/fund-transfer/forms';
import { FundTransferService, DonorAccountService } from "common/data";
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { getDonorNameDropdown } from 'core/utils';
import _ from 'lodash';

class FundTransferCreateViewStore extends BaseEditViewStore {
    @observable senderDonorAccountDropdownStore = null;
    @observable senderDonorAccount = null;
    @observable recepientDonorAccountDropdownStore = null;
    @observable recepientDonorAccount = null;

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
                placeholder: 'Choose Donor',
                initFetch: false
            },
            {
                fetchFunc: async (term) => {
                    let options = { page: 1, rpp: 15, embed: 'coreUser,donorAccountAddresses,address' };
                    options.exceptId = this.recepientDonorAccount ? this.recepientDonorAccount.id : null;
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    const response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: this.onChangeSenderDonorAccount
            }
        );

        this.recepientDonorAccountDropdownStore = new BaasicDropdownStore(
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
                    options.exceptId = this.senderDonorAccount ? this.senderDonorAccount.id : null;
                    if (term && term !== '') {
                        options.searchQuery = term;
                    }

                    const response = await this.donorAccountService.search(options);
                    return _.map(response.item, x => { return { id: x.id, name: getDonorNameDropdown(x) } });
                },
                onChange: this.onChangeRecepientDonorAccount
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

    @action.bound async onChangeRecepientDonorAccount(option) {
        if (option) {
            this.form.$('recepientDonorAccountId').set('value', option.id);
            let params = {};
            params.embed = ['coreUser'];
            const response = await this.donorAccountService.get(option.id, params);
            this.recepientDonorAccount = response;
        }
        else {
            this.recepientDonorAccount = null;
            this.form.$('recepientDonorAccountId').set('value', null);
        }
    }
}

export default FundTransferCreateViewStore;
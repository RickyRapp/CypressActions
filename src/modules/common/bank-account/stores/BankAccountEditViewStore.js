import { action, observable } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { BankAccountService } from "common/data";
import { DonorAccountBankAccountEditForm } from "modules/common/bank-account/forms";
import _ from 'lodash';

class BankAccountEditViewStore extends BaseEditViewStore {
    @observable thirdParty = false;

    constructor(rootStore, { id, onAfterUpdate, item }) {
        const bankAccountService = new BankAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'bank account',
            id: id,
            actions: {
                update: async bankAccount => {
                    return await bankAccountService.update(bankAccount);;
                },
                get: async id => {
                    if (item) {
                        return item;
                    }
                    else {
                        let params = {};
                        params.embed = ['thirdPartyAccountHolder,address,emailAddress,phoneNumber']
                        const response = await bankAccountService.get(id, params);
                        return response;
                    }
                }
            },
            FormClass: DonorAccountBankAccountEditForm,
            goBack: false,
            onAfterUpdate: onAfterUpdate
        });
    }

    @action.bound
    async onThirdPartyChange(event) {
        if (event.target.checked) {
            this.thirdParty = true;
        }
        else {
            this.thirdParty = false;
        }
    }

}

export default BankAccountEditViewStore;
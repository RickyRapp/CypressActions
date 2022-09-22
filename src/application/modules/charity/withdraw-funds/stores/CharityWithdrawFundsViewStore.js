import { BaasicDropdownStore, BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable, computed } from 'mobx';
import { RouterState } from 'mobx-state-router';

@applicationContext
class CharityWithdrawFundsViewStore extends BaseViewStore {
    @observable isACH = true;
    @observable charityAddress;
    @observable bankAccount;
    @observable amount;
    @observable amountValidationMessage;
    @observable addressValidationMessage;
    @observable bankAccountValidationMessage;

    @computed get availableBalance() {
        return this.rootStore.userStore.userBalances.availableBalance;
    }

    constructor(rootStore) {
        super(rootStore);

        this.getCharityAddress();
        this.createBankAccountDropdownStore();
    }

    @action.bound
    onChange(value) {
        this.isACH = value;
    }

    async getCharityAddress() {
        let params = {
            charityId: this.rootStore.userStore.applicationUser.id,
            orderBy: 'isPrimary',
            orderDirection: 'desc'
        }
        const data = await this.rootStore.application.charity.charityStore.findCharityAddress(params);
        this.charityAddress = data.item[0];
    }

    createBankAccountDropdownStore() {
        this.bankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    const data = await this.rootStore.application.administration.charityStore.getCharity(this.rootStore.userStore.applicationUser.id, { embed: 'charityBankAccounts' });
                    var plaidVerifiedBankAccounts = data.charityBankAccounts.filter(c => {
                        return (
                            c.isVerifiedByPlaid === true
                        )
                    });
                    return plaidVerifiedBankAccounts;
                },
                onChange: (bankAccount) => {
                    this.bankAccount = bankAccount;
                }
            });
    }

    @action.bound
    changeValue(value) {
        this.amount = value;
        if (value <= 0) {
            this.amountValidationMessage = "Amount can't be lower than 0."
            return false;
        }

        if (this.availableBalance < value) {
            this.amountValidationMessage = "Amount can't be greater than available balance."
            return false;
        }
        this.amountValidationMessage = '';
    }

    @action.bound
    async createWithdraw() {
        const address = this.charityAddress;
        this.bankAccountValidationMessage = "";
        this.amountValidationMessage = "";
        this.addressValidationMessage = "";

        if (!this.isACH && (address.addressLine1 === ""
            || address.city === ""
            || address.state === ""
            || address.zipCode === "")) {
            this.addressValidationMessage = "Invalid address."
            return false
        }
        if (this.isACH && (this.bankAccount === null || this.bankAccount === undefined || this.bankAccount === "")) {
            this.bankAccountValidationMessage = "Please select bank account."
            return false;
        }

        if (!this.amount || this.amount <= 0 || this.availableBalance <= this.amount) {
            this.amountValidationMessage = 'Please enter valid Amount.';
            return false;
        }

        const resource = {
            charityId: this.rootStore.userStore.applicationUser.id,
            amount: this.amount,
            charityBankAccountId: this.bankAccount,
            IsAch: this.isACH,
            charityAddress: {
                addressLine1: address.addressLine1,
                addressLine2: address.addressLine2,
                city: address.city,
                state: address.state,
                zipCode: address.zipCode,
            }
        }

        const data = await this.rootStore.application.charity.grantStore.createWithdraw(resource);
        await this.rootStore.userStore.updateCharityBalances();
        this.rootStore.notificationStore.success('Successfully created withdraw');
        this.rootStore.routerStore.goTo(new RouterState('master.app.main.charity.dashboard'));
    }

    @action.bound
    async redirectToManageAccount() {
        this.rootStore.routerStore.goTo(new RouterState('master.app.main.charity.profile'));
    }
}

export default CharityWithdrawFundsViewStore;

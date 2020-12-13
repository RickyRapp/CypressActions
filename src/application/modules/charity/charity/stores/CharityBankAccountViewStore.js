import { action } from 'mobx';
import { BaasicUploadStore, BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityBankAccountEditForm } from 'application/charity/charity/forms';

@applicationContext
class CharityBankAccountViewStore extends BaseEditViewStore {
    constructor(rootStore, props) {
        super(rootStore, {
            name: 'bank-account',
            id: undefined,
            autoInit: false,
            actions: {
                get: async () => {
                    const data = await rootStore.application.charity.charityStore.getCharityBank(this.id, { embed: 'accountHolder' });
                    return {
                        name: data.name,
                        accountNumber: data.accountNumber,
                        routingNumber: data.routingNumber,
                        description: data.description,
                        coreMediaVaultEntryId: data.coreMediaVaultEntryId,
                        isThirdPartyAccount: data.isThirdPartyAccount,
                        accountHolderName: data.accountHolder.name,
                        addressLine1: data.accountHolder.addressLine1,
                        addressLine2: data.accountHolder.addressLine2,
                        city: data.accountHolder.city,
                        state: data.accountHolder.state,
                        zipCode: data.accountHolder.zipCode,
                        email: data.accountHolder.email,
                        number: data.accountHolder.number
                    };
                },
                update: async (resource) => {
                    await this.rootStore.application.charity.charityStore.updateBankAccount({ charityId: this.charityId, id: this.id, ...resource });
                    if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                        await this.rootStore.application.charity.charityStore.uploadBankAccount(this.imageUploadStore.files[0], this.charityId, this.id);
                    }
                },
                create: async (resource) => {
                    const response = await this.rootStore.application.charity.charityStore.createBankAccount({ charityId: this.charityId, ...resource });
                    if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                        await this.rootStore.application.charity.charityStore.uploadBankAccount(this.imageUploadStore.files[0], this.charityId, response.data);
                    }
                }
            },
            FormClass: CharityBankAccountEditForm
        });

        this.charityId = rootStore.userStore.applicationUser.id;
        this.createImageUploadStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([
                this.getCharityInfo()
            ]);
            if (this.charity.charityBankAccounts && this.charity.charityBankAccounts.length === 1) {
                this.id = this.charity.charityBankAccounts[0].id;
                await this.fetch([
                    this.getResource(this.id)
                ]);
            }

            this.form.$('routingNumber').onBlur = (event) => {
                this.onBlurRoutingNumber(event.target.value)
            };
            this.imageUploadStore.setInitialItems(this.form.$('coreMediaVaultEntryId').value)
        }
    }

    @action.bound
    async deleteBankAccount(bankAccount) {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete bank account?`,
            async () => {
                await this.rootStore.application.bank.bankStore.deleteCharityBank({ id: bankAccount.id, charityId: this.id });
                await this.queryUtility.fetch();
            }
        );
    }

    async getCharityInfo() {
        this.charity = await this.rootStore.application.charity.charityStore.getCharity(this.charityId, { embed: 'charityBankAccounts' });
    }

    async onBlurRoutingNumber(value) {
        if (value && value.replace(/-/g, "").length === 9) {
            const data = await this.rootStore.application.charity.charityStore.findRoutingNumber({
                pageNumber: 1,
                pageSize: 10,
                embed: ['bank'],
                number: value
            });

            if (data.totalRecords > 0) {
                this.form.$('name').set(data.item[0].bank.name);
            }
        }
    }

    createImageUploadStore() {
        this.imageUploadStore = new BaasicUploadStore(null, {
            onDelete: () => { // eslint-disable-line
                //async call to delete if needed
                this.form.$('coreMediaVaultEntryId').clear();
            }
        });
    }
}

export default CharityBankAccountViewStore;

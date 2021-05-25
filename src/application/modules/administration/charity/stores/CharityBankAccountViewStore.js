import { action } from 'mobx';
import { BaasicUploadStore, BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityBankAccountEditForm } from 'application/administration/charity/forms';

@applicationContext
class CharityBankAccountViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'bank-account',
            id: undefined,
            autoInit: false,
            actions: {
                get: async () => {
                    const data = await rootStore.application.administration.charityStore.getCharityBank(this.id, { embed: 'accountHolder' });
                    if (data) {
                        return {
                            name: data.name,
                            accountNumber: data.accountNumber,
                            routingNumber: data.routingNumber,
                            description: data.description,
                            coreMediaVaultEntryId: data.coreMediaVaultEntryId,
                            isThirdPartyAccount: data.isThirdPartyAccount,
                            email: data.accountHolder.email,
                            number: data.accountHolder.number
                        };
                    } else {
                        this.id = null;
                        return null;
                    }
                },
                update: async (resource) => {
                    await this.rootStore.application.administration.charityStore.updateBankAccount({ charityId: this.charityId, id: this.id, ...resource });
                    if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                        await this.rootStore.application.administration.charityStore.uploadBankAccount(this.imageUploadStore.files[0], this.charityId, this.id);
                    }
                },
                create: async (resource) => {
                    const response = await this.rootStore.application.administration.charityStore.createBankAccount({ charityId: this.charityId, ...resource });
                    if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                        await this.rootStore.application.administration.charityStore.uploadBankAccount(this.imageUploadStore.files[0], this.charityId, response.data);
                    }
                }
            },
            FormClass: CharityBankAccountEditForm
        });

        this.charityId = rootStore.routerStore.routerState.params.id;
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
    async deleteBankAccount() {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to delete bank account?`,
            async () => {
                await this.rootStore.application.administration.charityStore.deleteCharityBank({ id: this.id, charityId: this.charityId });
                this.form.clear();
                this.rootStore.notificationStore.success('Successfully deleted Bank account');
            }
        );
    }

    async getCharityInfo() {
        this.charity = await this.rootStore.application.administration.charityStore.getCharity(this.charityId, { embed: 'charityBankAccounts' });
    }

    async onBlurRoutingNumber(value) {
        if (value && value.replace(/-/g, "").length === 9) {
            const data = await this.rootStore.application.administration.charityStore.findRoutingNumber({
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

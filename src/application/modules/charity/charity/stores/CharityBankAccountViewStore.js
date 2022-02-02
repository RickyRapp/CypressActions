import { action, observable } from 'mobx';
import { BaasicUploadStore, BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityBankAccountEditForm } from 'application/charity/charity/forms';

@applicationContext
class CharityBankAccountViewStore extends BaseEditViewStore {
    @observable image = null;
    constructor(rootStore) {
        super(rootStore, {
            name: 'bank-account',
            id: undefined,
            autoInit: false,
            actions: {
                get: async () => {
                    const data = await rootStore.application.charity.charityStore.getCharityBank(this.id, { embed: 'accountHolder' });
                    if(data){
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
                } else {
                    this.id = null;
                    return null;
                }
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
        this.createBankAccountDropdownStore();
    }


    createBankAccountDropdownStore() {
        this.bankAccountDropdownStore = new BaasicDropdownStore(null,
            {
                fetchFunc: async () => {
                    // eslint-disable-next-line
                    let params = {
                        donorId: this.donorId,
                        orderBy: 'dateCreated',
                        orderDirection: 'desc'
                    }
                    const data = await this.rootStore.application.charity.charityStore.getCharity(this.charityId, { embed: 'charityBankAccounts' });
                    return data.charityBankAccounts;
                }
            });
    }

    @action.bound
    async selectCharity(){
        this.id = null;
        this.form.clear();
        if(this.bankAccountDropdownStore.value && this.bankAccountDropdownStore.value.id) {
            this.id = this.bankAccountDropdownStore.value.id;
            await this.fetch([
                this.getResource(this.id)
            ]);
            if(this.item.coreMediaVaultEntryId)
                this.imageUploadStore.setInitialItems(this.item.coreMediaVaultEntryId)
        }
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
                this.bankAccountDropdownStore = null;
                this.createBankAccountDropdownStore();
                this.form.clear();
                this.id = null;
                this.rootStore.notificationStore.success('Successfully deleted Bank account');
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

    @action.bound
    async resetBankAccount() {
        this.id = null;
        this.bankAccountDropdownStore.value = null;
        this.form.clear();
        this.imageUploadStore.clear();
    }

    createImageUploadStore() {
        this.imageUploadStore = new BaasicUploadStore(null, {
            onDelete: () => { // eslint-disable-line
                //async call to delete if needed
                this.form.$('coreMediaVaultEntryId').clear();
            }
        });
    }

    @action.bound
    async getImage(fileId) {
        if (this.attachment != null) {
            try {
                var service = new CharityFileStreamService(this.rootStore.application.baasic.apiClient);
                this.imageLoading = true;
                const response = await service.get(fileId);
                this.imageLoading = false;
                return response;
            }
            catch (err) {
                this.uploadLoading = false;
                this.rootStore.notificationStore.error('ERROR', err);
            }
        }
        return null;
    }
}

export default CharityBankAccountViewStore;

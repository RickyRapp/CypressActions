import { action, observable } from 'mobx';
import { BaasicUploadStore, BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityBankAccountEditForm } from 'application/administration/charity/forms';
import axios from 'axios';
import { CharityFileStreamService } from 'common/services';

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
                        //response only returns new bankAccountId
                        await this.rootStore.application.administration.charityStore.uploadBankAccount(this.imageUploadStore.files[0], this.charityId, response);
                    }
                }
            },
            FormClass: CharityBankAccountEditForm
        });

        this.charityId = rootStore.routerStore.routerState.params.id;
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
                    const data = await this.rootStore.application.administration.charityStore.getCharity(this.charityId, { embed: 'charityBankAccounts' });
                    return data.charityBankAccounts;
                }
            });
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
            // if(this.charity.charityBankAccounts && this.charity.charityBankAccounts.length > 1) {
            //     alert("Multiple bank accounts");
            // }
            this.form.$('routingNumber').onBlur = (event) => {
                this.onBlurRoutingNumber(event.target.value)
            };
            this.imageUploadStore.setInitialItems(this.form.$('coreMediaVaultEntryId').value)
        }
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

    @action.bound
    async resetBankAccount() {
        this.id = null;
        this.bankAccountDropdownStore.value = null;
        this.form.clear();
        this.imageUploadStore.clear();
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

    async getBankAccounts() {
        const access_token = sessionStorage.getItem("plaidAccessToken");
        //console.log("Access token is", access_token);
        var data = {
          client_id: ApplicationSettings.plaidClientId,
          secret: ApplicationSettings.plaidSecret,
          access_token: access_token
        }
        var response;
        if(access_token != null) {
            response = axios.post(ApplicationSettings.plaidPath+"/auth/get",data).catch((err) => {
                if(err) {
                  // handle error
                  // access_token is null or ather errors...
                }
              });
              if(response) {
                  //handle response data - ToDo
                  // const accountData = response.accounts;
                  // const numbers = response.numbers;
              }
        } else {
            response = null;
        }
    }

}

export default CharityBankAccountViewStore;

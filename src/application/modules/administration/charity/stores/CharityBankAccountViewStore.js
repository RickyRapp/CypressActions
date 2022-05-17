import { action, observable } from 'mobx';
import { BaasicUploadStore, BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityBankAccountEditForm } from 'application/administration/charity/forms';
import axios from 'axios';
import { CharityFileStreamService } from 'common/services';
import { saveAs } from '@progress/kendo-file-saver';

@applicationContext
class CharityBankAccountViewStore extends BaseEditViewStore {
    @observable image = null;
    @observable verifiedByPlaid = null;
    constructor(rootStore) {
        super(rootStore, {
            name: 'bank-account',
            id: undefined,
            autoInit: false,
            actions: {
                get: async () => {
                    const data = await rootStore.application.administration.charityStore.getCharityBank(this.id, { embed: 'accountHolder' });
                    if (data) {
                        this.verifiedByPlaid = data.isVerifiedByPlaid;
                        this.charityMedia = null;
                        let isImage = false;
                        if(data.coreMediaVaultEntryId){
                            this.charityMedia = await rootStore.application.charity.charityStore.getCharityBankMedia(data.coreMediaVaultEntryId);
                            isImage = !(this.charityMedia.type === 'application/pdf') && !(this.charityMedia.type === 'application/octet-stream');
    
                            if(!isImage){
                                this.chariytBankFile = this.charityMedia;
                                const fileExtensions = (this.charityMedia.type === 'application/pdf') ? 'pdf' : 'csv';
                                this.fileName = `${data.name}-${data.routingNumber}.${fileExtensions}`;
                            }
                        }

                        return {
                            name: data.name,
                            accountNumber: data.accountNumber,
                            routingNumber: data.routingNumber,
                            description: data.description,
                            isThirdPartyAccount: data.isThirdPartyAccount,
                            email: data.accountHolder.email,
                            number: data.accountHolder.number,
                            accountHolderName: data.accountHolder && data.accountHolder.name,
                            addressLine1: data.accountHolder && data.accountHolder.addressLine1,
                            addressLine2: data.accountHolder && data.accountHolder.addressLine2,
                            city: data.accountHolder && data.accountHolder.city,
                            state: data.accountHolder && data.accountHolder.state,
                            zipCode: data.accountHolder && data.accountHolder.zipCode,
                            isDisabled : data.isDisabled,
                            charityMedia : this.charityMedia,
                            isImage: isImage,
                            isPrimary: data.accountHolder && data.isPrimary,
                            isDisabled : data.isDisabled
                        };
                    } else {
                        this.id = null;
                        return null;
                    }
                },
                update: async (resource) => {
                    if(!resource.charityMedia){
                        resource.charityMedia = this.charityMedia;
                    }
                    
                    if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) { 
                        const res = await this.rootStore.application.charity.charityStore.uploadBankAccount(this.imageUploadStore.files[0], this.charityId, this.id);
                        resource.coreMediaVaultEntryId = res.id;
                    }
                    await this.rootStore.application.charity.charityStore.updateBankAccount({ charityId: this.charityId, id: this.id, ...resource });
                    
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
        this.charityMedia;
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
    async verifyBankAccount() {
        this.rootStore.modalStore.showConfirm(
            `Are you sure you want to verify bank account?`,
            async () => {
                await this.rootStore.application.administration.charityStore.verifyCharityBank({ id: this.id, charityId: this.charityId });
                this.bankAccountDropdownStore = null;
                this.createBankAccountDropdownStore();
                this.form.clear();
                this.id = null;
                this.verifiedByPlaid = null;
                this.rootStore.notificationStore.success('Successfully verified Bank account');
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
        this.imageUploadStore = new BaasicUploadStore;
    }

    @action.bound
    getBankAccounts() {
        const access_token = this.charity.accessToken;
        
        var data = {
          client_id: ApplicationSettings.plaidClientId,
          secret: ApplicationSettings.plaidSecret,
          access_token: access_token
        }
        if(access_token != null) {
            axios.post(ApplicationSettings.plaidPath+"/auth/get",data).then((response) => {
                if(response) {
                    const accountData = response.data.accounts;
                    const accountNumbers = response.data.numbers;
                    
                    let account;
                    for(const item in accountNumbers) {
                        if(accountNumbers[item].length > 0) {
                            for (let i = 0; i < accountNumbers[item].length; i++) {
                                if(accountNumbers[item][i].account_id === accountData[0].account_id)
                                    {
                                        account = accountNumbers[item][i];
                                        break;
                                    }
                            }
                        }
                    }
                    
                    this.form.$('routingNumber').set(account.routing);
                    this.form.$('name').value = accountData[0].name;
                    this.form.$('accountNumber').value = account.account;
                    
                    //handle response data - ToDo
                    // const accountData = response.accounts;
                    // const numbers = response.numbers;
                }
            }).catch((err) => {
                if(err) {
                  // handle error
                  // access_token is null or ather errors...
                  this.rootStore.notificationStore.error('Bank accounts error', err);
                }
              });
        }
    }

    @action.bound
    async exportFile(){
        try {
            saveAs(this.chariytBankFile, this.fileName);
        } catch (err) {
            this.rootStore.notificationStore.error("Error", err);
        }
    }

}

export default CharityBankAccountViewStore;

import { action, observable } from 'mobx';
import { BaasicUploadStore, BaseEditViewStore } from 'core/stores';
import { applicationContext, isSome } from 'core/utils';
import { CharityBankAccountEditForm } from 'application/charity/charity/forms';
import { saveAs } from '@progress/kendo-file-saver';
import { async } from 'rxjs/internal/scheduler/async';

@applicationContext
class CharityBankAccountEditViewStore extends BaseEditViewStore {
    @observable image = null;

    constructor(rootStore, props) {
        super(rootStore, {
            name: 'charity-bank-account',
            id: props.editId,
            actions: {
                get: async () => {
                    const data = await rootStore.application.charity.charityStore.getCharityBank(props.editId, { 
                        embed: 'accountHolder'
                     });
                    
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
                    id: data.id,
                    name: data.name,
                    accountNumber: data.accountNumber,
                    routingNumber: data.routingNumber,
                    description: data.description,
                    coreMediaVaultEntryId: data.coreMediaVaultEntryId,
                    accountHolderName: data.accountHolder && data.accountHolder.name,
                    addressLine1: data.accountHolder && data.accountHolder.addressLine1,
                    addressLine2: data.accountHolder && data.accountHolder.addressLine2,
                    city: data.accountHolder && data.accountHolder.city,
                    state: data.accountHolder && data.accountHolder.state,
                    zipCode: data.accountHolder && data.accountHolder.zipCode,
                    email: data.accountHolder && data.accountHolder.email,
                    number: data.accountHolder && data.accountHolder.number,
                    isPrimary: data.accountHolder && data.isPrimary,
                    charityMedia : this.charityMedia,
                    isImage : isImage,
                    isVerifiedByPlaid : data.isVerifiedByPlaid,
                    isDisabled : data.isDisabled
                };
            },    
                update: async (resource) => {

                    if(!resource.charityMedia){
                        resource.charityMedia = this.charityMedia;
                    }

                    if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) { 
                        const res = await this.rootStore.application.charity.charityStore.uploadBankAccount(this.imageUploadStore.files[0], this.charityId, this.id);
                        resource.coreMediaVaultEntryId = res.id;
                    }

                    await this.rootStore.application.charity.charityStore.updateBankAccount({ id: props.editId, charityId: this.charityId, ...resource });
                    rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                },
                create: async (resource) => { 
                    if(props.bankAccountCount < 1) {
						resource.isPrimary = true;
					}
                    if(!this.imageUploadStore.files[0]){
                        rootStore.notificationStore.error('Please enter media');
                        return;
                    } 
                    let response;
                    try {
                        response = await this.rootStore.application.charity.charityStore.createBankAccount({ charityId: this.charityId, ...resource });

                        if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                            const media = await this.rootStore.application.charity.charityStore.uploadBankAccount(this.imageUploadStore.files[0], this.charityId, response);
                            resource.coreMediaVaultEntryId = media.id; 
                            await this.rootStore.application.charity.charityStore.updateBankAccount({ id: response, charityId: this.charityId, ...resource });
                        }

                    } catch (error) {
                        rootStore.notificationStore.error('Create failed', error);
                    }
                    
                    rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
                }
            },
            FormClass: CharityBankAccountEditForm,
            onAfterAction: () => {
				if (props.onEditCompleted) {
					props.onEditCompleted();
				}
				if (props.modalParams && props.modalParams.data && props.modalParams.data.onAfterAction) {
					props.modalParams.data.onAfterAction();
				}
			},
        });
        this.bankAccountCount = props.bankAccountCount;
        this.charityId = rootStore.userStore.applicationUser.id;
        this.createImageUploadStore();
        this.onCancelEditClick = props.onCancelEditClick;
        this.chariytBankFile;
        this.fileName;
        this.charityMedia;
    }

    @action.bound
	async onInit({ initialLoad }) {
		if (!initialLoad) {
			this.rootStore.routerStore.goBack();
		} else {
			await this.fetch([
                this.getCharityInfo()
            ]);
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
                try{
                    await this.rootStore.application.administration.charityStore.deleteCharityBank({ id: this.id, charityId: this.charityId });
                    this.bankAccountDropdownStore = null;
                    this.form.clear();
                    this.rootStore.notificationStore.success("Successfully deleted Bank account");
                }catch (error) {
                    this.rootStore.notificationStore.error('Error: ', error);
                }
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

    createImageUploadStore() {
        this.imageUploadStore = new BaasicUploadStore;
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

export default CharityBankAccountEditViewStore;

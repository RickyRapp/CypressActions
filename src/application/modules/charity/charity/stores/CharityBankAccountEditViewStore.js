import { action, observable, reaction } from 'mobx';
import { BaasicUploadStore, BaseEditViewStore } from 'core/stores';
import { applicationContext, isSome } from 'core/utils';
import { CharityBankAccountEditForm } from 'application/charity/charity/forms';
import { saveAs } from '@progress/kendo-file-saver';
import { async } from 'rxjs/internal/scheduler/async';
import { RouterState } from 'mobx-state-router';

@applicationContext
class CharityBankAccountEditViewStore extends BaseEditViewStore {
    @observable image = null;
    @observable fileError;
    @observable invalidForm = false;
    @observable bankAccountId = null;
    @observable charityMedia = null;
    @observable isImage = false;

    constructor(rootStore, props) {
        super(rootStore, {
            name: 'charity-bank-account',
            id: props.editId,
            actions: {
                get: async (id) => {
                    const data = await rootStore.application.charity.charityStore.getCharityBank(id || props.editId, { 
                        embed: 'accountHolder'
                     });
                    let isImage = false;
                    this.charityMedia = null;
                    if(data.coreMediaVaultEntryId){
                        this.charityMedia = await rootStore.application.charity.charityStore.getCharityBankMedia(data.coreMediaVaultEntryId);
                        isImage = !(this.charityMedia.type === 'application/pdf') && !(this.charityMedia.type === 'application/octet-stream');
                        if(!isImage){
                            this.chariytBankFile = this.charityMedia;
                            const fileExtensions = (this.charityMedia.type === 'application/pdf') ? 'pdf' : 'csv';
                            this.fileName = `${data.name}-${data.routingNumber}.${fileExtensions}`;
                        }
                    }
                    this.isImage = isImage;
                    return {
                    id: data.id,
                    name: data.name,
                    accountNumber: data.accountNumber,
                    routingNumber: data.routingNumber,
                    coreMediaVaultEntryId: data.coreMediaVaultEntryId,
                    isPrimary: data.isPrimary,
                    isDisabled : data.isDisabled,
                    charityMedia : this.charityMedia,
                    isImage : this.isImage,
                    isVerifiedByPlaid : data.isVerifiedByPlaid
                };
            },    
                update: async (resource) => {                    
                    if(!resource.charityMedia){
                        resource.charityMedia = this.charityMedia;
                    }

                    if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) { 
                        const res = await this.rootStore.application.charity.charityStore.uploadBankAccount(this.imageUploadStore.files[0], this.charityId, resource.id);
                        resource.coreMediaVaultEntryId = res.id;
                    }

                    resource.charityId = this.charityId;
                    await this.rootStore.application.charity.charityStore.updateBankAccount(resource);

                    if(!this.isVerified){
                        this.rootStore.routerStore.goTo(new RouterState('master.app.main.charity.bank-account-verification'));
                    }
                    
                    rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_UPDATE');
                },
                create: async (resource) => { 
                    this.fileError = "";
                    if(props.bankAccountCount < 1) {
						resource.isPrimary = true;
					}
                    if(!this.imageUploadStore.files[0]){
                        this.fileError = 'Please enter media';
                        this.invalidForm = true;
                        return 0;
                    } 
                    this.invalidForm = false;
                    let response;
                    try {
                        response = await this.rootStore.application.charity.charityStore.createBankAccount({ charityId: this.charityId, ...resource });
                        if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
                            const media = await this.rootStore.application.charity.charityStore.uploadBankAccount(this.imageUploadStore.files[0], this.charityId, response);
                            resource.coreMediaVaultEntryId = media.id;
                            resource.id = response;
                            resource.charityId = this.charityId;
                            await this.rootStore.application.charity.charityStore.updateBankAccount(resource);
                        }

                    } catch (error) {
                        rootStore.notificationStore.error('Create failed', error);
                    }
                    if(!this.isVerified){
                        this.rootStore.routerStore.goTo(new RouterState('master.app.main.charity.bank-account-verification'));
                    }

                    rootStore.notificationStore.success('EDIT_FORM_LAYOUT.SUCCESS_CREATE');
                }
            },
            FormClass: CharityBankAccountEditForm,
            onAfterAction: () => {
                if(this.invalidForm){
                    return 0;
                }
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
        this.isVerified = this.rootStore.userStore.applicationUser.permissions.verifiedAccountSection ? true : false;
        this.isNotVerifiedButHasBankAccount = !this.isVerified && this.bankAccountCount > 0;
        this.react(() => this.bankAccountId, () => {
            this.onChangeEditId(this.bankAccountId);
        });
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
                let service = new CharityFileStreamService(this.rootStore.application.baasic.apiClient);
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

    @action.bound
    onChangeEditId(editId){
        Promise.resolve(this.actions.get(editId)) 
			.then((data) => {
				this.form.clear();
				this.form.update(data);
                this.setItem(data);
			});
    }

    @action.bound
    changeBankAccountId(editId){
        this.bankAccountId = editId;
    }

}

export default CharityBankAccountEditViewStore;

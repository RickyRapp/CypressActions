import { action } from 'mobx';
import { BaasicUploadStore, BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { saveAs } from '@progress/kendo-file-saver';
import { CharifyFileVerificationForm } from '../forms';

@applicationContext
class CharityFileVerificationViewStore extends BaseEditViewStore {

    constructor(rootStore) {
        super(rootStore, {
            name: 'charity-file-verification',
            id: rootStore.userStore.applicationUser.id,
            actions: {
                get: async (id) => {
                    const data = await rootStore.application.administration.charityStore.getCharity(id);
                        this.charityMedia = null;
                        let isImage = false;
                        console.log(data);
                        if( data && data.userVerificationDocumentId){
                            this.charityMedia = await rootStore.application.charity.charityStore.getCharityBankMedia(data.userVerificationDocumentId);
                            isImage = !(this.charityMedia.type === 'application/pdf') && !(this.charityMedia.type === 'application/octet-stream');
                            this.userVerificationDocumentId = data.userVerificationDocumentId;
                            if(!isImage){
                                this.chariytBankFile = this.charityMedia;
                                const fileExtensions = (this.charityMedia.type === 'application/pdf') ? 'pdf' : 'csv';
                                this.fileName = `${data.name}-${data.routingNumber}.${fileExtensions}`;
                            }
                        }else{
                            return null;
                        }

                        return {
                            charityMedia : this.charityMedia,
                            isImage: isImage
                        };

                }
            },
            FormClass: CharifyFileVerificationForm
        });

        this.createImageUploadStore();
        this.charityMedia;
        this.charityId = this.rootStore.userStore.applicationUser.id;
    }
    
    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.loaderStore.suspend();
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

    @action.bound
    async uploadVerificationFile(){        
        if (this.imageUploadStore.files && this.imageUploadStore.files.length === 1) {
            const res = await this.rootStore.application.charity.charityStore.uploadCharityVerificationDocument(this.imageUploadStore.files[0], this.charityId, this.id);
            var userVerificationDocumentId = res.id;
        }else{
            this.rootStore.notificationStore.success('Please upload a file');
            return;
        }
        var response = await this.rootStore.application.charity.charityStore.updateCharityVerificationDocument({ id: this.charityId, userVerificationDocumentId: userVerificationDocumentId });
        if(response.statusCode === 200){
            window.location.reload();
            this.rootStore.notificationStore.success('Successfully uploaded verification document');
        }else{
            this.rootStore.notificationStore.success('There was a problem uploading a file');
        }
    }

}

export default CharityFileVerificationViewStore;

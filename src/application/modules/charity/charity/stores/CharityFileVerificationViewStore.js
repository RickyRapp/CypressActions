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
                get: async () => {
                    return null;
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

    createImageUploadStore() {
        this.imageUploadStore = new BaasicUploadStore;
        this.imageUploadStore.options.multiple = true;
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
        let userVerificationDocumentIdCsv = ''; 
        let index = 1;
    if (this.imageUploadStore.files && this.imageUploadStore.files.length >= 1) {
        for(const element of this.imageUploadStore.files ){
            const res = await this.rootStore.application.charity.charityStore.uploadCharityVerificationDocument(element, this.charityId, this.id);
            if(res){
                userVerificationDocumentIdCsv += res.id + (index < this.imageUploadStore.files.length ? ',' : '');
                index++;
            }
        }
    }else{
        this.rootStore.notificationStore.success('Please upload a file');
        return;
    }

    var response = await this.rootStore.application.charity.charityStore.updateCharityVerificationDocument({ id: this.charityId, userVerificationDocumentIdCsv: userVerificationDocumentIdCsv });
    if(response){
        //window.location.reload();
        this.rootStore.notificationStore.success('Successfully uploaded verification document');
    }else{
        this.rootStore.notificationStore.success('There was a problem uploading a file');
    } 

    }

}

export default CharityFileVerificationViewStore;

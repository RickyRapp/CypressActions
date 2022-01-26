import { action, observable } from 'mobx';
import { BaasicUploadStore, BaseEditViewStore } from 'core/stores';
import { ReconcileFileForm } from 'application/administration/reconcile/forms';
import { applicationContext } from 'core/utils';

@applicationContext
class ReconcileUploadFileViewStore extends BaseEditViewStore {
    @observable isUploaded = false;
    @observable isUploading = false;
    @observable response;

    constructor(rootStore) {
        super(rootStore, {
            name: 'reconcile-file',
            id: undefined,
            autoInit: false,
            FormClass: ReconcileFileForm
        });

        this.createFileUploadStore();
        
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            this.fileUploadStore.setInitialItems(this.form.$('coreMediaVaultEntryId').value)
        }
    }

    createFileUploadStore() {
        this.fileUploadStore = new BaasicUploadStore(null, {
            onDelete: () => { 
                this.form.$('coreMediaVaultEntryId').clear();
            }
        });
    }

    @action.bound
    async uploadFile(){
        const formFile = this.fileUploadStore.files;

        if(!formFile || formFile.length === 0)
            return;

        const file = formFile[0].getRawFile();
        let formData = new FormData();
        
        this.isUploading = true;
        formData.append('file', file, file.name);
        this.response = await this.rootStore.application.administration.reconcileStore.uploadFile(formData);
        
        this.isUploading = false;
        this.isUploaded = true;
    }

}

export default ReconcileUploadFileViewStore;
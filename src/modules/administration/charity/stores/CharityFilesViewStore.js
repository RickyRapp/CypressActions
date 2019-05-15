import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { FileStreamService } from 'common/data';
import { imageJpg, imageJpeg, imagePng, imageGif, applicationMSWord, applicationMSExcel, applicationPDF } from "core/utils"
import _ from 'lodash'

class CharityFilesViewStore extends BaseViewStore {
    @observable refresh = new Date();

    constructor(rootStore) {
        super(rootStore);
        this.rootStore = rootStore;
        this.id = rootStore.routerStore.routerState.params.id;
        this.fileStreamService = new FileStreamService(rootStore.app.baasic.apiClient);
        this.uploadFunc = this.fileStreamService.tdfCreateCharityDocument;
    }

    @action.bound onRefresh() {
        this.refresh = new Date();
    }
}

export default CharityFilesViewStore;

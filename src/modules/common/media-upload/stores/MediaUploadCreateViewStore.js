import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { FileStreamService } from 'common/data';
import { imageJpg, imageJpeg, imagePng, imageGif, applicationMSWord, applicationMSExcel, applicationPDF } from "core/utils"
import _ from 'lodash'

class MediaUploadCreateViewStore extends BaseViewStore {
    @observable files = [];

    constructor(rootStore, { onRefresh, uploadFunc }) {
        super(rootStore);
        this.rootStore = rootStore;
        this.id = rootStore.routerStore.routerState.params.id;
        this.maxSize = 1048576;
        this.isMultiple = true;
        this.isRemoveEnabled = true;
        this.isThumbnailEnabled = true;
        this.acceptFileExtensions = 'image/gif,image/jpg,image/jpeg,image/png,application/msword,application/vnd.ms-excel,application/pdf' //example
        this.onRefresh = onRefresh;
        this.uploadFunc = uploadFunc;

        this.imageExtensions = [imageJpeg, imageJpg, imagePng, imageGif];
        this.applicationMSWord = applicationMSWord;
        this.applicationMSExcel = applicationMSExcel;
        this.applicationPDF = applicationPDF;
    }

    @action.bound onDropFile(acceptedFiles) {
        //some validation
        if (acceptedFiles && acceptedFiles.length > 0) {
            if (this.isInAcceptFileExtensions(acceptedFiles)) {

                if (this.isThumbnailEnabled) {
                    this.resolveThumbnailPreview(acceptedFiles);
                }

                this.files = this.files.concat(acceptedFiles);
            }
        }
    }

    @action.bound removeFile(file) {
        if (this.isRemoveEnabled) {
            //some validation
            if (file) {
                const index = this.files.indexOf(file);
                const files = this.files.slice(0);
                files.splice(index, 1);
                this.files = files;
            }
        }
    }

    @action isInAcceptFileExtensions(acceptedFiles) {
        return _.difference(this.acceptFileExtensions, _.map(acceptedFiles, file => { return { type: file.type } })).length === 0;
    }

    @action resolveThumbnailPreview(acceptedFiles) {
        acceptedFiles.map(file => {
            Object.assign(file, {
                preview: this.getThumbnail(file)
            })
        });
    }

    @action getThumbnail(file) {
        if (this.isImage(file)) {
            return URL.createObjectURL(file);
        }
        else {
            //custom thumbnails
            switch (file.type) {
                case this.applicationMSWord:
                    return null;
                    break;
                case this.applicationMSExcel:
                    return null;
                    break;
                case this.applicationPDF:
                    return null;
                    break;
                default:
                    return null;
                    break;
            }
        }
    }

    @action isImage(file) {
        return _.includes(this.imageExtensions, file.type);
    }

    @action.bound async onSubmit() {
        for (let index = 0; index < this.files.length; index++) {
            const file = this.files[index];
            try {
                debugger;
                if (_.isFunction(this.uploadFunc)) {
                    await this.uploadFunc(file, this.id)
                    this.rootStore.notificationStore.success("File Uploaded Successfully: " + file.name);
                }
            } catch (errorResponse) {
                this.rootStore.notificationStore.showMessageFromResponse(errorResponse);
            }
        }

        this.files = [];
        this.onRefresh()
    }
}

export default MediaUploadCreateViewStore;

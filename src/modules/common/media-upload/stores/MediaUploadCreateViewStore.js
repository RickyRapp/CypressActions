import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { FileStreamService } from 'common/data';
import { imageJpg, imageJpeg, imagePng, imageGif, applicationMSWord, applicationMSExcel, applicationPDF, isErrorCode } from "core/utils"
import _ from 'lodash'

class MediaUploadCreateViewStore extends BaseViewStore {
    @observable files = [];

    constructor(rootStore, { onRefresh, userId, path, onAfterFileUpload, setAcceptFileExtensions }) {
        super(rootStore);
        this.rootStore = rootStore;
        this.userId = userId;
        this.path = path;
        this.onAfterFileUpload = onAfterFileUpload;
        this.maxSize = 1048576;
        this.isMultiple = true;
        this.isRemoveEnabled = true;
        this.isThumbnailEnabled = true;
        this.setAcceptFileExtensions
        this.acceptFileExtensions = setAcceptFileExtensions ? setAcceptFileExtensions : [imageJpg, imageJpeg, imagePng, imageGif, applicationMSWord, applicationMSExcel, applicationPDF]
        this.onRefresh = onRefresh;
        this.fileStreamService = new FileStreamService(rootStore.app.baasic.apiClient);
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
        return (_.map(acceptedFiles, file => { return file.type })).every(type => this.acceptFileExtensions.includes(type));
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
                case applicationMSWord:
                    return null;
                    break;
                case applicationMSExcel:
                    return null;
                    break;
                case applicationPDF:
                    return null;
                    break;
                default:
                    return null;
                    break;
            }
        }
    }

    @action isImage(file) {
        return _.includes([imageJpeg, imageJpg, imagePng, imageGif], file.type);
    }

    @action.bound async onSubmit() {
        let fileEntries = [];
        for (let index = 0; index < this.files.length; index++) {
            const file = this.files[index];
            try {
                const fileResponse = await this.fileStreamService.create(file, this.path + file.name);
                fileEntries.push(fileResponse.data);
                this.rootStore.notificationStore.success("File Uploaded Successfully: " + file.name);
            } catch (errorResponse) {
                this.rootStore.notificationStore.showMessageFromResponse(errorResponse);
            }
        }

        if (this.onAfterFileUpload && _.isFunction(this.onAfterFileUpload)) {
            const response = await this.onAfterFileUpload(fileEntries);
            if (isErrorCode(response.statusCode)) {
                let filesForDelete = [];
                _.forEach(fileEntries, function (file) {
                    filesForDelete.push({
                        id: file.id,
                        fileFormat: file.fileExtension
                    })
                });
                this.fileStreamService.deleteBatch(filesForDelete)
            }
            this.rootStore.notificationStore.showMessageFromResponse(response);
        }

        this.files = [];
        this.onRefresh()
    }
}

export default MediaUploadCreateViewStore;

import _ from 'lodash';
import { merge } from 'lodash';
import { observable, action, computed } from 'mobx';
import { LoaderStore } from 'core/stores';
import { FileStreamRouteService } from 'common/services';

class BaasicUploadStore {
    @observable.ref originalFiles = [];
    @observable.ref files = [];
    loaderStore = new LoaderStore();

    @computed get loading() {
        return this.loaderStore.loading;
    }

    options = {
        placeholder: null,
        multiple: false,
        removeFromBuffer: true,
        deleteUploaded: true,
        disabled: false,
        label: 'DROPZONE.TITLE',
        acceptFiles: ['.png', '.jpg', '.jpeg'],
        showPreview: true,
        showLivePreview: true,
        routeService: new FileStreamRouteService()
    };

    actions = {
        onRemove: () => { },
        onDelete: () => { },
        onChange: () => { }
    };

    constructor(options = null, actions = null, initialState = null) {
        if (options) merge(this.options, options);
        if (actions) merge(this.actions, actions);
        if (initialState) this.originalFiles = initialState;
    }

    @action.bound
    setInitialItems(files) {
        if (_.isArray(files)) {
            this.originalFiles.concat(files);
        }
        else if (_.isString(files)) { //coreMediaVaultEntryId
            this.originalFiles.push(files)
        }
    }

    @action.bound
    setValue(files) {
        if (files && files.length > 0) {
            this.files = files;
        }
        else {
            this.files = [];
        }
    }

    @action.bound
    clear() {
        this.files = [];
        this.originalFiles = [];
    }

    @action.bound
    setLoading(value) {
        if (value) {
            this.loaderStore.suspend();
        } else {
            this.loaderStore.resume();
        }
    }

    onChange(item) {
        const tempFiles = item.affectedFiles;
        this.setValue(tempFiles);

        let returnValue = null;
        if (tempFiles && tempFiles.length > 0) {
            if (this.options.multiple) {
                returnValue = tempFiles;
            } else {
                returnValue = tempFiles[0];
            }
        }

        this.actions.onChange(returnValue);
    }

    @action.bound
    onRemoveFromBuffer(file) {
        if (file && this.files.length > 0) {
            const index = this.files.indexOf(file);
            if (index > -1) {
                this.files = this.files.filter((c, i) => i !== index);
            }
        }
    }

    @action.bound
    onDeleteUploaded(fileId) {
        if (fileId && this.originalFiles.length > 0) {
            const index = this.originalFiles.indexOf(fileId);
            if (index > -1) {
                this.originalFiles = this.originalFiles.filter((c, i) => i !== index);
            }
        }

        this.actions.onDelete(fileId);
    }
}

export default BaasicUploadStore;

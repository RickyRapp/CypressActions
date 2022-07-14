import { action, observable,computed } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { CharityFileStreamService } from 'common/services';
import SessionScanEditForm from '../forms/SessionScanEditForm';

import _ from 'lodash';

@applicationContext
class SessionScanEditViewStore extends BaseViewStore {

    @observable data = [];

    @computed get hasDirtyItems() {
        return this.data.some(i => i.isDirty);
    }

    get isEdit() {
        return this.rootStore.routerStore.routerState.routeName.includes("edit");
    }

    constructor(rootStore) {
        super(rootStore);
        this.id = rootStore.routerStore.routerState.params.id;
        this.fileStreamService = rootStore.createApplicationService(CharityFileStreamService);
        this.loaderStore = this.createLoaderStore();
        this.form = new SessionScanEditForm();
        
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.getResource();
        }
    }

    @action.bound
    async getResource() {
        try {
            const response = await this.rootStore.application.administration.sessionStore.getScannedSessionDetails(this.id);
            this.data = response.item;
        } catch(err) {
            console.log(err);
        }
    }

    openImage = async (id) => {
        try {
            const response = await this.fileStreamService.get(id);
            return URL.createObjectURL(response.data);
        } catch(err) {
            console.log(err);
        }
    }

	@action.bound
    onItemChange(event, item, field) {
        item[field] = event.target.value;
        item.isDirty = true;
        this.data = [...this.data];
    }

    @action.bound
    saveChanges() {
        const dirtyItems = this.data.filter(i => i.isDirty);
        debugger
    }
}

export default SessionScanEditViewStore;

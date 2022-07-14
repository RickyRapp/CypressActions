import { action, observable } from 'mobx';
import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { SessionService } from '../services';
import SessionScanEditForm from '../forms/SessionScanEditForm';

import _ from 'lodash';

@applicationContext
class SessionScanEditViewStore extends BaseViewStore {

    @observable data = [];

    constructor(rootStore) {
        super(rootStore);
        this.id = rootStore.routerStore.routerState.params.id;
        this.fileStreamService = rootStore.createApplicationService(SessionService);
        this.loaderStore = this.createLoaderStore();
        this.form = new SessionScanEditForm();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.getResource()
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
            debugger
            return URL.createObjectURL(response.data);
        } catch(err) {
            console.log(err);
        }
    }

    @action.bound
    saveRowChanges(item) {
        console.log(item);
        debugger
    }
}

export default SessionScanEditViewStore;

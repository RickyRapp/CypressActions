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
            this.loaderStore.suspend();
            const response = await this.rootStore.application.administration.sessionStore.getScannedSessionDetails(this.id);
            this.data = response.item;
        } catch(err) {
            console.log(err);
        } finally {
            this.loaderStore.resume();
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
    async saveChanges() {
        try {
            this.loaderStore.suspend();
            console.log(this.data);
            const items = this.data.map(item => ({ id: item.id, barcode: item.barcode, amount: Number(item.value), key: item.key}));
            
            // console.log(this.data);
            // const sessionKey = this.data[0].key;
            
            // const responseFinish = await this.rootStore.application.administration.sessionStore.finishSession({ key: parseInt(sessionKey) });
            // console.log(responseFinish);
            
            const response = await this.rootStore.application.administration.sessionStore.updateScannedSession(items);
            
            const notUpdatedValues = response.map(r => !r.isEligible);
            const updatedValues = response.reduce((acc, r) => {
                r.isEligible && acc.push(r.certificate.barcode);
                return acc;
            }, []);

            console.log()
            if ((notUpdatedValues.filter(x => x == true)).length > 0) {
                this.rootStore.notificationStore.error(`Failed to update sessions with barcode ${notUpdatedValues.join(", ")}`);
            }

            if (updatedValues.length > 0 && notUpdatedValues.length === 0) {
                this.rootStore.notificationStore.success("Resource updated successfully");
            }

            if (updatedValues.length > 0 && notUpdatedValues.length > 0) {
                this.rootStore.notificationStore.success(`Sessions with barcode ${updatedValues.join(", ")} updated successfully`);
            }
            await this.getResource();

        } catch(err) {
            console.log(err)
        } finally {
            // this.loaderStore.resume();
            this.rootStore.routerStore.goBack();
        }
    }
}

export default SessionScanEditViewStore;

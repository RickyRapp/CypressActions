import { action, observable } from 'mobx';
import { BasePreviewViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';

@applicationContext
class ReconcileCashedPreviewViewStore extends BasePreviewViewStore {
    @observable isEditable = false;

    constructor(rootStore) {
        super(rootStore, {
            name: 'cashed-preview',
            id: undefined,
            autoInit: false
        });
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            return true;
        }
    }
}

export default ReconcileCashedPreviewViewStore;

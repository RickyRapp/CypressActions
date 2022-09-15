import { BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action } from 'mobx';

@applicationContext
class PlaidUnsuccessfulVerificatonViewStore extends BaseViewStore {
    constructor(rootStore, props) {
        super(rootStore);
        this.props = props;
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

    @action.bound
    redirectToPlaid(){
        this.props.changeToPlaid();
    }

    @action.bound
    redirectToManual(){
        this.props.changeToManually();
    }
}

export default PlaidUnsuccessfulVerificatonViewStore;

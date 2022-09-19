import { BaseTabViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';

@applicationContext
class CharityVerificationTabViewStore extends BaseTabViewStore {
    @observable plaidVerification = false;
    @observable plaidUnsuccessful = false;
    @observable plaidSuccessful = false;
    @observable manuallyVerify = false;
    @observable manualSuccessful = false;

    constructor(rootStore) {
        super(rootStore);
        this.loaderStore.resume();
        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.charityId = rootStore.routerStore.routerState.params.id;
        }
        else {
            this.charityId = rootStore.userStore.user.charityId;
        }
        this.plaidVerification = true;
    }

    @action.bound
    async changeToManually(){
        this.manuallyVerify = true;
        this.plaidUnsuccessful = this.plaidSuccessful = this.manualSuccessful = this.plaidVerification = false;
    }

    @action.bound
    changeToManuallySucessful(){
        this.manualSuccessful = true;
        this.plaidUnsuccessful = this.plaidSuccessful = this.manuallyVerify = this.plaidVerification = false; 
    }

    @action.bound
    changeToPlaidSucessful(){
        this.plaidSuccessful = true;
        this.plaidUnsuccessful = this.manualSuccessful = this.manuallyVerify = this.plaidVerification = false; 
    }

    @action.bound
    changeToPlaidUnsucessful(){
        this.plaidUnsuccessful = true;
        this.plaidSuccessful = this.manualSuccessful = this.manuallyVerify = this.plaidVerification = false; 
    }

    @action.bound
    changeToPlaid(){
        this.plaidVerification = true;
        this.plaidSuccessful = this.manualSuccessful = this.manuallyVerify = this.plaidUnsuccessful = false; 
    }

}

export default CharityVerificationTabViewStore;
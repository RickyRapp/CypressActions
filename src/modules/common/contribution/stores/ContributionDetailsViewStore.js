import { action, observable } from 'mobx';
import { ContributionService, LookupService } from "common/data";
import { BaseViewStore } from "core/stores";
import _ from 'lodash';

class ContributionDetailsViewStore extends BaseViewStore {
    @observable contributionStatuses = null;
    @observable contribution = null;
    @observable paymentTypes = null;

    constructor(rootStore, { id }) {
        super(rootStore);

        this.id = id;
        this.contributionService = new ContributionService(rootStore.app.baasic.apiClient);
        this.paymentTypeLookup = new LookupService(rootStore.app.baasic.apiClient, 'payment-type');

        this.load();
    }

    @action.bound async load() {
        this.loaderStore.suspend();
        await this.loadLookups();

        let params = {};
        params.embed = ['payerInformation,address,emailAddress,phoneNumber,bankAccount,createdByCoreUser,contributionStatus,donorAccount,coreUser'];
        let model = await this.contributionService.get(this.id, params);
        if (model.json && JSON.parse(model.json).paymentTypeInformations) {
            _.forOwn(JSON.parse(model.json).paymentTypeInformations, function (value, key) {
                model[key] = value;
            });
        }
        this.contribution = model;
        this.loaderStore.resume();
    }

    @action.bound async loadLookups() {
        let paymentTypeModels = await this.paymentTypeLookup.getAll();
        this.paymentTypes = _.orderBy(paymentTypeModels.data, ['sortOrder'], ['asc']);
    }
}

export default ContributionDetailsViewStore;
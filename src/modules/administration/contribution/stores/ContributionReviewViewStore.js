import { action, observable } from 'mobx';
import { ContributionService, LookupService } from "common/data";
import { BaseViewStore, BaasicDropdownStore } from 'core/stores';
import _ from 'lodash';

class ContributionReviewViewStore extends BaseViewStore {
    @observable dropdownError = null;
    @observable contribution = null;
    @observable contributionStatusDropdownStore = null;

    constructor(rootStore, { id, onAfterReview }) {
        super(rootStore);
        this.rootStore = rootStore;
        this.id = id;
        this.contributionService = new ContributionService(this.rootStore.app.baasic.apiClient);
        this.onAfterReview = onAfterReview;
        this.load();
    }

    @action.bound async load() {
        this.loaderStore.suspend();
        let params = {};
        params.embed = ['donorAccount,coreUser'];
        let model = await this.contributionService.get(this.id, params);
        this.contribution = model;

        this.contributionStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'contribution-status');
        let statuses = await this.contributionStatusLookupService.getAll();
        let availableStatuses = this.checkStatus(statuses.data, model);

        let store = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Contribution Status',
                textField: 'name',
                dataItemKey: 'id',
                clearable: true
            },
            {
                onChange: () => this.dropdownError = null
            },
            _.map(availableStatuses, e => { return { id: e.id, name: e.name } })
        );
        this.contributionStatusDropdownStore = store;
        this.loaderStore.resume();
    }

    @action.bound async onReview() {
        if (this.contributionStatusDropdownStore.value) {
            try {
                let response = await this.contributionService.review({
                    id: this.contribution.id,
                    contributionStatusId: this.contributionStatusDropdownStore.value[this.contributionStatusDropdownStore.options.dataItemKey],
                });

                this.rootStore.notificationStore.showMessageFromResponse(response);
            } catch (errorResponse) {
                this.rootStore.notificationStore.showMessageFromResponse(errorResponse);
                return;
            }

            if (this.onAfterReview && _.isFunction(this.onAfterReview)) {
                this.onAfterReview();
            }
        }
        else {
            this.dropdownError = 'Please Select Status To Review.';
        }
    }

    checkStatus(statuses, model) {
        let pending = _.find(statuses, { abrv: 'pending' });
        let inProcess = _.find(statuses, { abrv: 'in-process' });
        let funded = _.find(statuses, { abrv: 'funded' });
        let canceled = _.find(statuses, { abrv: 'canceled' });
        let declined = _.find(statuses, { abrv: 'declined' });

        let availableStatuses = [];

        if (model.contributionStatusId === pending.id) {
            availableStatuses.push(inProcess);
            availableStatuses.push(canceled);
        }
        else if (model.contributionStatusId === inProcess.id) {
            availableStatuses.push(funded);
            availableStatuses.push(canceled);
        }
        else if (model.contributionStatusId === funded.id) {
            availableStatuses.push(declined);
        }
        return availableStatuses;
    }
}



export default ContributionReviewViewStore
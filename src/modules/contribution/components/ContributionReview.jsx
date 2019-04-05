import React from 'react';
import { action } from 'mobx';
import { BaasicDropdownStore } from "core/stores";
import { ContributionReviewTemplate } from 'themes/modules/contribution/components';
import { LookupService, ContributionService } from "common/data";
import _ from 'lodash';
import { inject } from "mobx-react";

@inject(i => ({
    rootStore: i.rootStore
}))
class ContributionReview extends React.Component {
    constructor({ rootStore, id, onAfterReview }) {
        super();
        this.rootStore = rootStore;
        this.contributionService = new ContributionService(this.rootStore.app.baasic.apiClient);
        this.onAfterReview = onAfterReview;
        this.load(id);
    }

    @action.bound async load(id) {
        let params = {};
        params.embed = ['donorAccount,coreUser'];
        let model = await this.contributionService.get(id, params);
        this.setState({ contribution: model });

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
                onChange: () => this.setState({ dropdownError: null })
            },
            _.map(availableStatuses, e => { return { 'id': e.id, 'name': e.name } })
        );
        this.setState({ contributionStatusDropdownStore: store });
    }

    @action.bound async onReview() {
        if (this.state.contributionStatusDropdownStore.value) {
            let response = await this.contributionService.review({
                id: this.state.contribution.id,
                contributionStatusId: this.state.contributionStatusDropdownStore.value[this.state.contributionStatusDropdownStore.options.dataItemKey],
            });

            this.rootStore.notificationStore.showMessageFromResponse(response);

            if (this.onAfterReview && _.isFunction(this.onAfterReview)) {
                this.onAfterReview();
            }
        }
        else {
            this.setState({ dropdownError: 'Please Select Status To Review.' });
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

    render() {
        return (
            <ContributionReviewTemplate
                contributionStatusDropdownStore={this.state ? this.state.contributionStatusDropdownStore : null}
                contribution={this.state ? this.state.contribution : null}
                onReview={this.onReview}
                dropdownError={this.state ? this.state.dropdownError : null}
                {...this.props} />
        );
    }
}

export default ContributionReview;

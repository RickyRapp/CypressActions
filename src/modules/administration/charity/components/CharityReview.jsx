import React from 'react';
import { action } from 'mobx';
import { inject } from "mobx-react";
import { BaasicDropdownStore } from "core/stores";
import { CharityReviewTemplate } from 'themes/modules/administration/charity/components';
import { LookupService, CharityService } from "common/data";
import _ from 'lodash';

@inject(i => ({
    rootStore: i.rootStore
}))
class CharityReview extends React.Component {
    constructor({ rootStore, id, onAfterReview }) {
        super();
        this.rootStore = rootStore;
        this.charityService = new CharityService(this.rootStore.app.baasic.apiClient);
        this.onAfterReview = onAfterReview;
        this.load(id);
    }

    @action.bound async load(id) {
        let params = {};
        params.embed = ['donorAccount,coreUser'];
        let model = await this.charityService.get(id, params);
        this.setState({ charity: model });

        this.charityStatusLookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'charity-status');
        let statuses = await this.charityStatusLookupService.getAll();
        let availableStatuses = this.checkStatus(statuses.data, model);

        let store = new BaasicDropdownStore(
            {
                multi: false,
                placeholder: 'Choose Charity Status',
                textField: 'name',
                dataItemKey: 'id',
                clearable: true
            },
            {
                onChange: () => this.setState({ dropdownError: null })
            },
            _.map(availableStatuses, e => { return { 'id': e.id, 'name': e.name } })
        );
        this.setState({ charityStatusDropdownStore: store });
    }

    @action.bound async onReview() {
        if (this.state.charityStatusDropdownStore.value) {
            try {
                let response = await this.charityService.review({
                    id: this.state.charity.id,
                    charityStatusId: this.state.charityStatusDropdownStore.value[this.state.charityStatusDropdownStore.options.dataItemKey],
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
            this.setState({ dropdownError: 'Please Select Status To Review.' });
        }
    }

    checkStatus(statuses, model) {
        let pending = _.find(statuses, { abrv: 'pending' });
        let active = _.find(statuses, { abrv: 'active' });
        let revoked = _.find(statuses, { abrv: 'revoked' });
        let availableStatuses = [];

        if (model.charityStatusId === pending.id) {
            availableStatuses.push(active);
            availableStatuses.push(revoked);
        }
        else if (model.charityStatusId === active.id) {
            availableStatuses.push(revoked);
        }
        else if (model.charityStatusId === revoked.id) {
            availableStatuses.push(active);
        }
        return availableStatuses;
    }

    render() {
        return (
            <CharityReviewTemplate
                charityStatusDropdownStore={this.state ? this.state.charityStatusDropdownStore : null}
                charity={this.state ? this.state.charity : null}
                onReview={this.onReview}
                dropdownError={this.state ? this.state.dropdownError : null}
                {...this.props} />
        );
    }
}

export default CharityReview;

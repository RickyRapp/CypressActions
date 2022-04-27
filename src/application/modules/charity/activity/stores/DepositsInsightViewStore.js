import React from 'react';
import { BaseListViewStore, BaasicDropdownStore, SelectTableWithRowDetailsViewStore } from 'core/stores';
import { ReconcileListFilter } from 'application/administration/reconcile/models';


class DepositsInsightViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'charity-deposit-insight',
            authorization: 'theDonorsFundDonationSection',
            routes: {},
            actions: () => {
                return null;
            }
        });

        this.charityId = rootStore.userStore.applicationUser.id;
    }
}

export default DepositsInsightViewStore;

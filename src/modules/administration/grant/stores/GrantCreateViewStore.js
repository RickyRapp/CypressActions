import { action, computed } from 'mobx';
import { GrantCreateForm } from 'modules/common/grant/forms';
import { BaseGrantCreateViewStore } from 'modules/common/grant/stores';
import { GrantService, GrantScheduledPaymentService } from "common/data";
import _ from 'lodash';

class GrantCreateViewStore extends BaseGrantCreateViewStore {
    constructor(rootStore) {

        const userId = rootStore.routerStore.routerState.params.userId;
        const grantService = new GrantService(rootStore.app.baasic.apiClient);
        const grantScheduledPaymentService = new GrantScheduledPaymentService(rootStore.app.baasic.apiClient);

        const createViewStore = {
            name: 'grant',
            actions: {
                create: async item => {
                    if (!(item.grantPurposeTypeId === this.inMemoryOfId || item.grantPurposeTypeId === this.inHonorOfId || item.grantPurposeTypeId === this.sponsorAFriendId)) {
                        item.grantPurposeMember = null;
                    }

                    if (item.grantScheduleTypeId === this.monthlyId ||
                        item.grantScheduleTypeId === this.annualId ||
                        this.isFutureGrant) {
                        let response = null;
                        try {
                            response = await grantScheduledPaymentService.create(item);
                            is.rootStore.notificationStore.showMessageFromResponse(response);
                            rootStore.routerStore.navigate('master.app.administration.grant.scheduled.list');
                        } catch (errorResponse) {
                            rootStore.notificationStore.showMessageFromResponse(errorResponse);
                            this.loaderStore.resume();
                            return;
                        }
                    }
                    else {
                        let response = null;
                        try {
                            response = await grantService.create(item);
                            rootStore.notificationStore.showMessageFromResponse(response);
                            rootStore.routerStore.navigate('master.app.administration.grant.list');
                        } catch (errorResponse) {
                            rootStore.notificationStore.showMessageFromResponse(errorResponse);
                            this.loaderStore.resume();
                            return;
                        }
                    }
                }
            },
            FormClass: GrantCreateForm,
            goBack: false,
            setValues: true,
            loader: true
        }

        const config = {};
        config.createViewStore = createViewStore;
        config.userId = userId;

        super(rootStore, config);

        this.minimumAmount = 0;
        this.load();
    }

    @action.bound onStartFutureDateChange() {
        if (this.form.$('grantScheduleTypeId').value === this.monthlyId ||
            this.form.$('grantScheduleTypeId').value === this.annualId ||
            this.isFutureGrant) {
            this.form.$('amount').set('rules', `required|numeric|min:${this.minimumAmount}`)
        }
        else {
            this.form.$('amount').set('rules', `required|numeric|min:${this.minimumAmount}|max:${((this.donorAccount.availableBalance + this.donorAccount.lineOfCredit) / (1 + this.donorAccount.grantFee / 100)).toFixed(2)}`)
        }
    }
}

export default GrantCreateViewStore;
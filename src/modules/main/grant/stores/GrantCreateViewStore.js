import { action } from 'mobx';
import { GrantCreateForm } from 'modules/common/grant/forms';
import { BaseGrantCreateViewStore } from 'modules/common/grant/stores';
import { GrantService, GrantScheduledPaymentService } from "common/data";
import _ from 'lodash';

class GrantCreateViewStore extends BaseGrantCreateViewStore {
    constructor(rootStore) {

        const userId = rootStore.authStore.user.id;
        const grantService = new GrantService(rootStore.app.baasic.apiClient);
        const grantScheduledPaymentService = new GrantScheduledPaymentService(rootStore.app.baasic.apiClient);

        const createViewStore = {
            name: 'grant',
            actions: {
                create: async item => {
                    if (!(item.grantPurposeTypeId === this.inMemoryOfId || item.grantPurposeTypeId === this.inHonorOfId || item.grantPurposeTypeId === this.sponsorAFriendId)) {
                        item.grantPurposeMember = null;
                    }

                    if (item.recurringOrFuture) {
                        try {
                            const response = await grantScheduledPaymentService.create(item);
                            rootStore.notificationStore.showMessageFromResponse(response);
                            rootStore.routerStore.navigate('master.app.main.grant.list');
                        } catch (errorResponse) {
                            rootStore.notificationStore.showMessageFromResponse(errorResponse);
                            return;
                        }
                    }
                    else {
                        try {
                            const response = await grantService.create(item);
                            rootStore.notificationStore.showMessageFromResponse(response);
                            rootStore.routerStore.navigate('master.app.main.grant.list');
                        } catch (errorResponse) {
                            rootStore.notificationStore.showMessageFromResponse(errorResponse);
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

        this.load();
    }

    setFormDefaults() {
        super.setFormDefaults();
        this.onRecurringOrFutureChange(this.form.$('recurringOrFuture').value);
    }

    @action.bound onRecurringOrFutureChange(option) {
        this.form.$('recurringOrFuture').set('value', option);
        if (this.form.$('recurringOrFuture').value === true) {
            this.form.$('amount').set('rules', `required|numeric|min:${this.donorAccount.grantMinimumAmount}`)
        }
        else {
            this.form.$('amount').set('rules', `required|numeric|min:${this.donorAccount.grantMinimumAmount}|max:${((this.donorAccount.availableBalance + this.donorAccount.lineOfCredit) / (1 + this.donorAccount.grantFee / 100)).toFixed(2)}`)
        }
    }
}

export default GrantCreateViewStore;
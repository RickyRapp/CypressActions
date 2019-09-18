import { action } from 'mobx';
import { GrantCreateForm } from 'modules/common/grant/forms';
import { BaseGrantCreateViewStore } from 'modules/common/grant/stores';
import { GrantService, GrantScheduledPaymentService } from "common/data";
import _ from 'lodash';

class GrantCreateViewStore extends BaseGrantCreateViewStore {
    constructor(rootStore) {

        const userId = rootStore.routerStore.routerState.params.userId;
        const grantService = new GrantService(rootStore.app.baasic.apiClient);
        const grantScheduledPaymentService = new GrantScheduledPaymentService(rootStore.app.baasic.apiClient);
        let grantCreate = false;

        const createViewStore = {
            name: 'grant',
            actions: {
                create: async item => {
                    let response = null;

                    if (!(item.grantPurposeTypeId === this.inMemoryOfId || item.grantPurposeTypeId === this.inHonorOfId || item.grantPurposeTypeId === this.sponsorAFriendId)) {
                        item.purposeMemberName = null;
                    }

                    if (item.grantScheduleTypeId === this.monthlyId ||
                        item.grantScheduleTypeId === this.annualId ||
                        (item.grantScheduleTypeId === this.oneTimeId && item.startFutureDate > (new Date()).toLocaleDateString())) {
                        item.charityId = item.donation.charityId;
                        response = await grantScheduledPaymentService.create(item);
                    }
                    else {
                        response = await grantService.create(item);
                        grantCreate = true;
                    }
                    return response;
                }
            },
            FormClass: GrantCreateForm,
            goBack: false,
            setValues: true,
            loader: true,
            onAfterCreate: () => grantCreate ?
                rootStore.routerStore.navigate('master.app.administration.grant.list') :
                rootStore.routerStore.navigate('master.app.administration.grant.scheduled.list')
        }

        const config = {};
        config.createViewStore = createViewStore;
        config.userId = userId;

        super(rootStore, config);

        this.isAdministratorOrEmployeeRole = rootStore.authStore.user.roles.includes('Administrators', 'Employees')
        this.minimumAmount = 0;
        this.load();
    }

    @action.bound onStartFutureDateChange() {
        if ((this.form.$('grantScheduleTypeId').value === this.monthlyId ||
            this.form.$('grantScheduleTypeId').value === this.annualId ||
            (this.form.$('grantScheduleTypeId').value === this.oneTimeId && this.form.$('grantScheduleTypeId').value > (new Date()).toLocaleDateString()))) {
            this.form.$('amount').set('rules', `required|numeric|min:${this.minimumAmount}`)
        }
        else {
            this.form.$('amount').set('rules', `required|numeric|min:${this.minimumAmount}|max:${((this.donorAccount.availableBalance + this.donorAccount.lineOfCredit) / (1 + this.donorAccount.grantFee / 100)).toFixed(2)}`)
        }
    }
}

export default GrantCreateViewStore;
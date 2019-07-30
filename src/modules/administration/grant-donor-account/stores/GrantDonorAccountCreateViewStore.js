import { action } from 'mobx';
import { GrantDonorAccountCreateForm } from 'modules/common/grant-donor-account/forms';
import { BaseGrantDonorAccountCreateViewStore } from 'modules/common/grant-donor-account/stores';
import { GrantDonorAccountService, GrantScheduledPaymentService } from "common/data";
import _ from 'lodash';

class GrantDonorAccountCreateViewStore extends BaseGrantDonorAccountCreateViewStore {
    constructor(rootStore) {

        const userId = rootStore.routerStore.routerState.params.userId;
        const grantDonorAccountService = new GrantDonorAccountService(rootStore.app.baasic.apiClient);
        const grantScheduledPaymentService = new GrantScheduledPaymentService(rootStore.app.baasic.apiClient);
        let grantCreate = false;

        const createViewStore = {
            name: 'grant',
            actions: {
                create: async item => {
                    let response = null;

                    if (!(item.grantPurposeTypeId === this.inMemoryOfId || item.grantPurposeTypeId === this.inHonorOfId || item.grantPurposeTypeId === this.sponsorAFriendId)) {
                        item.grantPurposeMemberName = null;
                    }

                    if (item.grantScheduleTypeId === this.monthlyId || item.grantScheduleTypeId === this.annualId || this.isFutureGrant) {
                        response = await grantScheduledPaymentService.create(item);
                    }
                    else {
                        response = await grantDonorAccountService.create(item);
                        grantCreate = true;
                    }
                    return response;
                }
            },
            FormClass: GrantDonorAccountCreateForm,
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

export default GrantDonorAccountCreateViewStore;
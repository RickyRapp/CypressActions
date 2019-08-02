import { GrantDonorAccountEditForm } from 'modules/common/grant-donor-account/forms';
import { BaseGrantDonorAccountEditViewStore } from 'modules/common/grant-donor-account/stores';
import { GrantDonorAccountService } from "common/data";
import _ from 'lodash';

class GrantDonorAccountEditViewStore extends BaseGrantDonorAccountEditViewStore {
    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;
        const userId = rootStore.routerStore.routerState.params.userId;
        const grantDonorAccountService = new GrantDonorAccountService(rootStore.app.baasic.apiClient);

        const editViewStore = {
            name: 'grant',
            id: id,
            actions: {
                update: async item => {
                    if (!(item.grantPurposeTypeId === this.inMemoryOfId || item.grantPurposeTypeId === this.inHonorOfId || item.grantPurposeTypeId === this.sponsorAFriendId)) {
                        item.grantPurposeMemberName = null;
                    }

                    return await grantDonorAccountService.update(item);
                },
                get: async id => {
                    let params = {};
                    params.embed = ['grant', 'grant.charity'];
                    // params.fields = [
                    //     'id',
                    //     'charityId',
                    //     'donorAccountId',
                    //     'grantPurposeTypeId',
                    //     'grantAcknowledgmentTypeId',
                    //     'amount',
                    //     'grantPurposeMemberName',
                    // ]
                    const grant = await grantDonorAccountService.get(id, params);
                    return grant;
                }
            },
            FormClass: GrantDonorAccountEditForm,
            goBack: false,
            onAfterUpdate: () => rootStore.routerStore.navigate('master.app.administration.grant.list'),
            loader: true
        }

        const config = {};
        config.editViewStore = editViewStore;
        config.id = id;
        config.userId = userId;

        super(rootStore, config);
        this.isAdministratorOrEmployeeRole = rootStore.authStore.user.roles.includes('Administrators', 'Employees')
    }

    async load() {
        await super.load();
        this.form.$('amount').set('rules', 'required|numeric|min:0');
    }
}

export default GrantDonorAccountEditViewStore;
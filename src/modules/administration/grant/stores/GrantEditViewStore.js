import { GrantEditForm } from 'modules/common/grant/forms';
import { BaseGrantEditViewStore } from 'modules/common/grant/stores';
import { GrantService } from "common/data";
import _ from 'lodash';

class GrantEditViewStore extends BaseGrantEditViewStore {
    constructor(rootStore) {
        const id = rootStore.routerStore.routerState.params.id;
        const userId = rootStore.routerStore.routerState.params.userId;
        const grantService = new GrantService(rootStore.app.baasic.apiClient);

        const editViewStore = {
            name: 'grant',
            id: id,
            actions: {
                update: async item => {
                    if (!(item.grantPurposeTypeId === this.inMemoryOfId || item.grantPurposeTypeId === this.inHonorOfId || item.grantPurposeTypeId === this.sponsorAFriendId)) {
                        item.grantPurposeMember = null;
                    }

                    return await grantService.update(item);
                },
                get: async id => {
                    let params = {};
                    params.embed = 'grantPurposeMember'
                    const grant = await grantService.get(id, params);
                    return grant;
                }
            },
            FormClass: GrantEditForm,
            goBack: false,
            onAfterUpdate: () => rootStore.routerStore.navigate('master.app.administration.grant.list'),
            loader: true
        }

        const config = {};
        config.editViewStore = editViewStore;
        config.id = id;
        config.userId = userId;

        super(rootStore, config);

        this.load();
    }

    setFormDefaults() {
        super.setFormDefaults();
        this.form.$('amount').set('rules', 'required|numeric|min:0');
    }
}

export default GrantEditViewStore;
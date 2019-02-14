import { action } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { DonorAccountService } from "common/data";
import { DonorAccountSettingEditForm } from 'modules/donor-account/forms';
import _ from 'lodash';
import { isSome } from 'core/utils';

class DonorAccountSettingEditViewStore extends BaseEditViewStore {

    constructor(rootStore) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor account',
            id: rootStore.routerStore.routerState.params.id ? rootStore.routerStore.routerState.params.id : rootStore.authStore.user.id,
            actions: {
                update: async donorAccount => {
                    await donorAccountService.updateSettings({
                        id: this.id,
                        ...donorAccount
                    })
                },
                get: async id => {
                    const response = await donorAccountService.getSettings(id);
                    return response;
                },
            },
            FormClass: DonorAccountSettingEditForm
        });

        if (!isSome(rootStore.authStore.user.permissions.theDonorsFundSection)) {
            this.form.setFieldsDisabled(true);
        }
    }

    @action.bound async onChangeInitialContribution(option) {
        if (isSome(this.rootStore.authStore.user.permissions.theDonorsFundSection)) {
            this.item.initialContribution = option.currentTarget.checked;
            this.form.update(this.item);
        }
    }
}

export default DonorAccountSettingEditViewStore;
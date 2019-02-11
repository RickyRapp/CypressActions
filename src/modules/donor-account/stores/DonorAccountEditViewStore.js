import { action, observable } from 'mobx';
import { BaseEditViewStore } from "core/stores";
import { DonorAccountService, LookupService } from "common/data";
import { DonorAccountEditForm } from 'modules/donor-account/forms';
import _ from 'lodash';
import { isSome } from 'core/utils';

class DonorAccountEditViewStore extends BaseEditViewStore {
    @observable deliveryMethodsOptions = [{ label: 'Fetching', value: -1 }];
    @observable selectedDeliveryMethodOption = { label: 'Fetching', value: -1 };

    constructor(rootStore) {
        const donorAccountService = new DonorAccountService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor account',
            id: rootStore.routerStore.routerState.params.id,
            actions: {
                update: async donorAccount => {
                    if (donorAccount.coreUser.middleName) {
                        donorAccount.coreUser.json = JSON.stringify(donorAccount.coreUser.middleName);
                    }
                    else {
                        donorAccount.coreUser.json = null;
                    }

                    await donorAccountService.update({
                        id: this.id,
                        ...donorAccount
                    })
                },
                get: async id => {
                    let params = {};
                    params.embed = ['coreUser'];
                    const response = await donorAccountService.get(id, params);
                    if (response && response.coreUser && response.coreUser.json) {
                        response.coreUser.middleName = (JSON.parse(response.coreUser.json)).MiddleName;
                    }
                    return response;
                },
            },
            FormClass: DonorAccountEditForm
        });
    }

    @action.bound async onChangeDeliveryMethod(option) {
        console.log(option);
        this.selectedDeliveryMethodOption = option;
    }

    @action.bound async handleOptions() {
        let lookupService = new LookupService(this.rootStore.app.baasic.apiClient, 'delivery-method-type')

        let models = await lookupService.getAll();
        this.deliveryMethodsOptions = _.map(models.data, function (item) {
            return { label: item.name, value: item.id };
        })

        if (isSome(this.item) && _.find(this.deliveryMethodsOptions, { value: this.item.deliveryMethodTypeId })) {
            this.selectedDeliveryMethodOption = _.find(this.deliveryMethodsOptions, { value: this.item.deliveryMethodTypeId });
        }
    }
}

export default DonorAccountEditViewStore;
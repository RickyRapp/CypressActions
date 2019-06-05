import { action, observable, computed } from 'mobx';
import { GrantService, LookupService, DonorAccountService } from "common/data";
import { BaasicDropdownStore, BaseViewStore } from "core/stores";
import { ModalParams } from 'core/models';
import _ from 'lodash';

class GrantDetailsViewStore extends BaseViewStore {
    @observable grant = null;

    constructor(rootStore, { id }) {
        super(rootStore);

        this.id = id;
        this.grantService = new GrantService(rootStore.app.baasic.apiClient);

        this.load();
    }

    @action.bound async load() {
        this.loaderStore.suspend();
        await this.loadLookups();

        let params = {};
        params.embed = ['charity,donorAccount,coreUser,grantPurposeMember'];
        let model = await this.grantService.get(this.id, params);
        this.grant = model;
        this.loaderStore.resume();
    }

    @action.bound async loadLookups() {
    }
}

export default GrantDetailsViewStore;
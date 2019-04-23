import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class ContributionSettingListFilter extends FilterParams {
    @observable donorAccountId;

    constructor() {
        super();

        this.reset();
    }

    @action reset() {
        super.reset();
        this.donorAccountId = null;
    }
}

export default ContributionSettingListFilter;
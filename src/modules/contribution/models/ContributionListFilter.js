import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class ContributionListFilter extends FilterParams {
    @observable firstName;
    @observable lastName;

    constructor() {
        super();

        this.reset();
    }

    @action reset() {
        super.reset();

        this.firstName = null;
        this.lastName = null;
    }
}

export default ContributionListFilter;
import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class DonorAccountListFilter extends FilterParams {
    @observable firstName;
    @observable lastName;

    @observable emails;

    constructor() {
        super();

        this.reset();
    }

    @action reset() {
        super.reset();

        this.firstName = null;
        this.lastName = null;
        this.emails = null;
        this.accountType = null;
    }
}

export default DonorAccountListFilter;
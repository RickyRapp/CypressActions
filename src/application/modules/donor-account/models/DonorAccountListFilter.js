import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class DonorAccountListFilter extends FilterParams {
    @observable firstName;
    @observable lastName;
    @observable emails;
    @observable accountTypeId;

    constructor() {
        super();
        this.reset();
    }

    @action.bound
    reset() {
        super.reset();
        this.firstName = null;
        this.lastName = null;
        this.emails = null;
        this.accountTypeId = null;
    }
}

export default DonorAccountListFilter;

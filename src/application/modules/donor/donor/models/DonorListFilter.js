import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class DonorListFilter extends FilterParams {
    @observable firstName;
    @observable lastName;
    @observable emails;
    @observable accountTypeId;
    @observable accountNumber;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.firstName = null;
        this.lastName = null;
        this.emails = null;
        this.accountTypeId = null;
        this.accountNumber = null;
    }
}

export default DonorListFilter;

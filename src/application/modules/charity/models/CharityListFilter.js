import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class CharityListFilter extends FilterParams {
    @observable name;
    @observable taxId;
    @observable emails;
    @observable address;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.name = null;
        this.taxId = null;
        this.emails = null;
        this.address = null;
    }
}

export default CharityListFilter;

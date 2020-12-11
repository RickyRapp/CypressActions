import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class BankListFilter extends FilterParams {
    @observable name;

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
    }
}

export default BankListFilter;

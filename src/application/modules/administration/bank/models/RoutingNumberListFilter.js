import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class RoutingNumberListFilter extends FilterParams {
    @observable number;
    @observable bankId;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.number = null;
        this.bankId = null;
    }
}

export default RoutingNumberListFilter;

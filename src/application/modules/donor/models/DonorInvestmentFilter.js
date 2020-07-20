import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class DonorInvestmentFilter extends FilterParams {
    @observable id;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.id = null;
    }
}

export default DonorInvestmentFilter;

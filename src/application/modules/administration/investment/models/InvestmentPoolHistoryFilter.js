import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class InvestmentPoolHistoryFilter extends FilterParams {
    @observable investmentPoolIds;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.investmentPoolIds = null;
    }
}

export default InvestmentPoolHistoryFilter;

import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class CreditDebitListFilter extends FilterParams {
    @observable donorId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable dateCreatedTo;
    @observable dateCreatedFrom;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.donorId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.dateCreatedTo = null;
        this.dateCreatedFrom = null;
    }
}

export default CreditDebitListFilter;

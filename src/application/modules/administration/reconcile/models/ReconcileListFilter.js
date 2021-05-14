import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class ReconcileListFilter extends FilterParams {
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable paymentTypeIds;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.paymentTypeIds = null;
    }
}

export default ReconcileListFilter;

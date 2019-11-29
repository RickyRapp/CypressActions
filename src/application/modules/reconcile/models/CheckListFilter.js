import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class CheckListFilter extends FilterParams {
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;

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
    }
}

export default CheckListFilter;

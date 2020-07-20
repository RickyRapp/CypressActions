import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class GrantRequestListFilter extends FilterParams {
    @observable donorId;
    @observable charityId;
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
        this.donorId = null;
        this.charityId = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
    }
}

export default GrantRequestListFilter;

import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class EmailListFilter extends FilterParams {
    @observable donorAccountId;
    @observable charityId;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.donorAccountId = null;
        this.charityId = null;
    }
}

export default EmailListFilter;

import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class PendingDonationListFilter extends FilterParams {
    @observable dateCreatedTo;
    @observable dateCreatedFrom;
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
        this.dateCreatedTo = null;
        this.dateCreatedFrom = null;
        this.charityId = null;
    }
}

export default PendingDonationListFilter;

import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class PastGrantFilter extends FilterParams {
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedTo;
    @observable dateCreatedFrom;
    @observable charityId;
    @observable donationTypeIds;
    @observable donationStatusIds;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedTo = null;
        this.dateCreatedFrom = null;
        this.charityId = null;
        this.donationTypeIds = null;
        this.donationStatusIds = null;
    }
}

export default PastGrantFilter;

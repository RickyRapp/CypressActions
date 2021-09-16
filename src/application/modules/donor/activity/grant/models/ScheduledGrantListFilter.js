import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class ScheduledGrantListFilter extends FilterParams {
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedTo;
    @observable dateCreatedFrom;
    @observable donationStatusIds;
    @observable paymentTypeIds;
    @observable dollarRange;
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
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedTo = null;
        this.dateCreatedFrom = null;
        this.donationStatusIds = null;
        this.paymentTypeIds = null;
        this.dollarRange = null;
        this.charityId = null;
    }
}

export default ScheduledGrantListFilter;

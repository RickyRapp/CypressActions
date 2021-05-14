import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class ScheduledGrantListFilter extends FilterParams {
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable donationStatusIds;
    @observable paymentTypeIds;
    @observable dollarRange;

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
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.donationStatusIds = null;
        this.paymentTypeIds = null;
        this.dollarRange = null;
    }
}

export default ScheduledGrantListFilter;

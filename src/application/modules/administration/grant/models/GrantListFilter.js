import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class GrantListFilter extends FilterParams {
    @observable donorId;
    @observable charityId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable donationStatusIds;
    @observable donationTypeIds;

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
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedFrom = null;
        this.dateCreatedTo = null;
        this.donationStatusIds = null;
        this.donationTypeIds = null;
    }
}

export default GrantListFilter;

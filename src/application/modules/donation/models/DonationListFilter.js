import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class DonationListFilter extends FilterParams {
    @observable donorId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
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
        this.donorId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.charityId = null;
        this.donationTypeIds = null;
        this.donationStatusIds = null;
    }
}

export default DonationListFilter;

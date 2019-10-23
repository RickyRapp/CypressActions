import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class DonationListFilter extends FilterParams {
    @observable donorAccountId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
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
        this.donorAccountId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
    }
}

export default DonationListFilter;

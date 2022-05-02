import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class GrantListFilter extends FilterParams {
    @observable donorId;
    @observable charityId;
    @observable dollarRange;
    @observable confirmationNumber;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable donationStatusIds;
    @observable donationTypeIds;
    @observable purposeNote;
    @observable checkNumber;

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
        this.dollarRange = null;
        this.confirmationNumber = null;
        this.checkNumber = null;
        this.dateCreatedFrom = null;
        this.dateCreatedTo = null;
        this.donationStatusIds = null;
        this.donationTypeIds = null;
        this.purposeNote = null;
    }
}

export default GrantListFilter;

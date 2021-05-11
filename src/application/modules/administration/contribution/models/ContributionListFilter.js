import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class ContributionListFilter extends FilterParams {
    @observable donorId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable paymentNumber;
    @observable dateCreatedFrom;
    @observable dateCreatedTo;
    @observable contributionStatusIds;
    @observable paymentTypeIds;
    @observable nameOnCheck;
    @observable accountTypeId;

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
        this.paymentNumber = null;
        this.dateCreatedFrom = null;
        this.dateCreatedTo = null;
        this.contributionStatusIds = null;
        this.paymentTypeIds = null;
        this.accountTypeId = null;
        this.nameOnCheck = null;
    }
}

export default ContributionListFilter;

import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class ContributionListFilter extends FilterParams {
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedFrom;
    @observable dateCreatedTo;
    @observable contributionStatusIds;
    @observable paymentTypeIds;
    @observable nameOnCheck;
    @observable accountTypeId;
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
        this.dateCreatedFrom = null;
        this.dateCreatedTo = null;
        this.contributionStatusIds = null;
        this.paymentTypeIds = null;
        this.accountTypeId = null;
        this.dollarRange = null;
    }
}

export default ContributionListFilter;

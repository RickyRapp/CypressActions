import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class ContributionListFilter extends FilterParams {
    @observable donorId;
    @observable confirmationNumber;
    @observable dollarRange;
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
        this.confirmationNumber = null;
        this.dollarRange = null;
        this.paymentNumber = null;
        this.dateCreatedFrom = null;
        this.dateCreatedTo = null;
        this.contributionStatusIds = null;
        this.paymentTypeIds = null;
        this.accountTypeId = null;

    }
}

export default ContributionListFilter;

import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class FundTransferListFilter extends FilterParams {
    @observable donorAccountId;
    @observable senderDonorAccountId;
    @observable recipientDonorAccountId;
    @observable amountRangeMin;
    @observable amountRangeMax;
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
        this.senderDonorAccountId = null;
        this.recipientDonorAccountId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
    }
}

export default FundTransferListFilter;

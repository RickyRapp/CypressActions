import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class FundTransferListFilter extends FilterParams {
    @observable donorId;
    @observable senderDonorId;
    @observable recipientDonorId;
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
        this.senderDonorId = null;
        this.recipientDonorId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
    }
}

export default FundTransferListFilter;

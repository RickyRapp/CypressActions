import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class FundTransferListFilter extends FilterParams {
    @observable senderDonorAccountId;
    @observable recepientDonorAccountId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;

    constructor() {
        super();

        this.reset();
    }

    @action reset() {
        super.reset();
        this.senderDonorAccountId = null;
        this.recepientDonorAccountId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
    }
}

export default FundTransferListFilter;
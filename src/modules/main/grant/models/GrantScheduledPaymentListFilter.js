import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class GrantScheduledPaymentListFilter extends FilterParams {
    @observable donorAccountId;
    @observable name;
    @observable charityId;
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
        this.name = null;
        this.charityId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
    }
}

export default GrantScheduledPaymentListFilter;
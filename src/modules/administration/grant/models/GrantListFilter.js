import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class GrantListFilter extends FilterParams {
    @observable donorAccountId;
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
        this.donorAccountId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
    }
}

export default GrantListFilter;
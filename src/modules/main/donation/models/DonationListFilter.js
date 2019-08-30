import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class GrantListFilter extends FilterParams {
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
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
    }
}

export default GrantListFilter;
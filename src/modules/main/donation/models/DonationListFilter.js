import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class DonationListFilter extends FilterParams {
    @observable charityId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable done;

    constructor() {
        super();

        this.reset();
    }

    @action reset() {
        super.reset();
        this.done = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
    }
}

export default DonationListFilter;
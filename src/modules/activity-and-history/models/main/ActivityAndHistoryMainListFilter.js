import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';
import _ from 'lodash'

class ActivityAndHistoryMainListFilter extends FilterParams {
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable exportLimit;
    @observable exportFields;
    @observable done;
    @observable paymentTransactionStatusId;

    constructor() {
        super();

        this.reset();
    }

    @action reset() {
        super.reset();
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.exportLimit = null;
        this.exportFields = null;
        this.done = null;
        this.paymentTransactionStatusId = null;
    }
}

export default ActivityAndHistoryMainListFilter;
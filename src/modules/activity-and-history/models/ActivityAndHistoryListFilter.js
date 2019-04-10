import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';
import _ from 'lodash'

class ActivityAndHistoryListFilter extends FilterParams {
    @observable donorAccountId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable exportLimit;
    @observable exportFields;

    constructor() {
        super();

        this.reset();
    }

    @action reset() {
        super.reset();
        this.donorAccountId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.exportLimit = null;
        this.exportFields = null;
    }
}

export default ActivityAndHistoryListFilter;
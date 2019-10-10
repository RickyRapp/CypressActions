import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class ActivityAndHistoryListFilter extends FilterParams {
    @observable donorAccountId;

    constructor() {
        super();
        this.reset();
    }

    @action.bound
    reset() {
        super.reset();
        this.donorAccountId = null;
    }
}

export default ActivityAndHistoryListFilter;

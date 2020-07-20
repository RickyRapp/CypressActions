import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class ActivityAndHistoryListFilter extends FilterParams {
    @observable donorId;

    constructor() {
        super();
        this.reset();
    }

    @action.bound
    reset() {
        super.reset();
        this.donorId = null;
    }
}

export default ActivityAndHistoryListFilter;

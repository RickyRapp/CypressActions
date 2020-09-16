import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class ActivityListFilter extends FilterParams {
    @observable donorId;
    @observable dateCreatedFrom;
    @observable dateCreatedTo;

    constructor() {
        super();
        this.reset();
    }

    @action.bound
    reset() {
        super.reset();
        this.donorId = null;
        this.dateCreatedFrom = null;
        this.dateCreatedTo = null;
    }
}

export default ActivityListFilter;

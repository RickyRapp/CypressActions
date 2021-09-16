import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class DonorRecordActivityFilter extends FilterParams {
    @observable dateCreatedFrom;
    @observable dateCreatedTo;

    constructor() {
        super();
        this.reset();
    }

    @action.bound
    reset() {
        super.reset();
        this.dateCreatedFrom = null;
        this.dateCreatedTo = null;
    }
}

export default DonorRecordActivityFilter;

import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class DonorNoteListFilter extends FilterParams {
    @observable donorId;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.donorId = null;
    }
}

export default DonorNoteListFilter;

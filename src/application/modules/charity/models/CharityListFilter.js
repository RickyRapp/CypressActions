import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class CharityListFilter extends FilterParams {
    @observable name;
    @observable taxId;
    @observable emails;
    @observable address;
    @observable charityTypeIds;

    constructor(orderBy, orderDirection, pageSize = 10) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
        this.pageSize = pageSize;
    }

    @action.bound
    reset() {
        super.reset();
        this.name = null;
        this.taxId = null;
        this.emails = null;
        this.address = null;
        this.charityTypeIds = null;
    }
}

export default CharityListFilter;

import { action } from 'mobx';
import { FilterParams } from "core/models";

class ProcessorsCompaniesListFilter extends FilterParams {
    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
    }
}

export default ProcessorsCompaniesListFilter;

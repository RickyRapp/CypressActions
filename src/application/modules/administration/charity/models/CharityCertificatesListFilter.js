import { action } from 'mobx';
import { FilterParams } from "core/models";

class CharityCertificatesListFilter extends FilterParams {
    constructor() {
        super();
        this.reset();
    }

    @action.bound
    reset() {
        super.reset();
    }
}

export default CharityCertificatesListFilter;

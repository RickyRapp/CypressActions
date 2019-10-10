import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class CharityListFilter extends FilterParams {
    @observable name;
    @observable taxId;

    constructor() {
        super();
        this.reset();
    }

    @action.bound
    reset() {
        super.reset();
        this.name = null;
        this.taxId = null;
    }
}

export default CharityListFilter;

import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class ThirdPartyWebsiteListFilter extends FilterParams {
    @observable donorAccountId;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.donorAccountId = null;
    }
}

export default ThirdPartyWebsiteListFilter;

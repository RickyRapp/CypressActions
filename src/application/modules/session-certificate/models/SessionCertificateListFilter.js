import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class SessionCertificateListFilter extends FilterParams {
    @observable bookletCertificateCode;
    @observable charityId;
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
        this.bookletCertificateCode = null;
        this.charityId = null;
        this.donorAccountId = null;
    }
}

export default SessionCertificateListFilter;

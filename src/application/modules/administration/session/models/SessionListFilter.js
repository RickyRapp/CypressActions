import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class SessionListFilter extends FilterParams {
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedFrom;
    @observable dateCreatedTo;
    @observable bookletCertificateCode;
    @observable paymentTypeIds;
    @observable sessionStatusIds;
    @observable paymentNumber;
    @observable charityId;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedFrom = null;
        this.dateCreatedTo = null;
        this.bookletCertificateCode = null;
        this.paymentTypeIds = null;
        this.sessionStatusIds = null;
        this.paymentNumber = null;
        this.charityId = null;
    }
}

export default SessionListFilter;

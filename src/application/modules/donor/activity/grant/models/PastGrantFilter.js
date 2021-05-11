import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class PastGrantFilter extends FilterParams {
    @observable dollarRange;
    @observable confirmationNumber;
    @observable dateCreatedTo;
    @observable dateCreatedFrom;
    @observable charityId;
    @observable donationTypeIds;
    @observable donationStatusIds;
    @observable grantMemo;
    @observable bookletCertificateCode;

    constructor(orderBy, orderDirection) {
        super();
        this.reset();
        this.orderBy = orderBy;
        this.orderDirection = orderDirection;
    }

    @action.bound
    reset() {
        super.reset();
        this.dollarRange = null;
        this.confirmationNumber = null;
        this.dateCreatedTo = null;
        this.dateCreatedFrom = null;
        this.charityId = null;
        this.donationTypeIds = null;
        this.donationStatusIds = null;
        this.grantMemo = null;
        this.bookletCertificateCode = null;
    }
}

export default PastGrantFilter;

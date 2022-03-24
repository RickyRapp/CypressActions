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
    @observable donationStatusIds;
    @observable paymentNumber;
    @observable charityId;
    @observable dollarRange;
    @observable phoneNumber;
    @observable sessionEmail;
    @observable usernameCreatedSession;
    @observable fundraiserName;
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
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedFrom = null;
        this.dateCreatedTo = null;
        this.bookletCertificateCode = null;
        this.paymentTypeIds = null;
        this.donationStatusIds = null;
        this.paymentTypeIds = null;
        this.paymentNumber = null;
        this.charityId = null;
        this.dollarRange = null;
        this.phoneNumber = null;
        this.sessionEmail = null;
        this.username = null;
        this.fundraiserName = null;
        this.donorId = null;
    }
}

export default SessionListFilter;

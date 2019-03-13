import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class ContributionListFilter extends FilterParams {
    @observable donorAccountId;
    @observable paymentTypeId;
    @observable contributionStatusId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable contributionStatusIds;
    @observable paymentTypeIds;

    constructor(userId = null) {
        super();

        this.reset();

        if (userId) {
            this.donorAccountId = userId;
        }
    }

    @action reset() {
        super.reset();
        this.donorAccountId = null;
        this.paymentTypeId = null;
        this.contributionStatusId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.contributionStatusIds = null;
        this.paymentTypeIds = null;
    }
}

export default ContributionListFilter;
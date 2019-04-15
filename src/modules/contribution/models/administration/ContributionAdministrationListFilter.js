import { action, observable } from 'mobx';
import { FilterParams } from 'core/models';

class ContributionAdministrationListFilter extends FilterParams {
    @observable donorAccountId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable confirmationNumber;
    @observable dateCreatedStartDate;
    @observable dateCreatedEndDate;
    @observable contributionStatusIds;
    @observable paymentTypeIds;
    @observable exportLimit;
    @observable exportFields;

    constructor() {
        super();

        this.reset();
    }

    @action reset() {
        super.reset();
        this.donorAccountId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.confirmationNumber = null;
        this.dateCreatedStartDate = null;
        this.dateCreatedEndDate = null;
        this.contributionStatusIds = null;
        this.paymentTypeIds = null;
        this.exportLimit = null;
        this.exportFields = null;
    }
}

export default ContributionAdministrationListFilter;
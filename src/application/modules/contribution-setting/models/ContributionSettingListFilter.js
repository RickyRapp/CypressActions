import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class ContributionSettingListFilter extends FilterParams {
    @observable donorAccountId;
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable dateCreatedFrom;
    @observable dateCreatedTo;
    @observable contributionSettingTypeIds;

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
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.dateCreatedFrom = null;
        this.dateCreatedTo = null;
        this.contributionSettingTypeIds = null;

    }
}

export default ContributionSettingListFilter;

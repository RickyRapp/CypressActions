import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class GroupedDonationListFilter extends FilterParams {
    @observable amountRangeMin;
    @observable amountRangeMax;
    @observable countRangeMin;
    @observable countRangeMax;
    @observable charityId;
    @observable donationStatusIds;

    constructor() {
        super();
        this.reset();
    }

    @action.bound
    reset() {
        super.reset();
        this.donorId = null;
        this.amountRangeMin = null;
        this.amountRangeMax = null;
        this.countRangeMin = null;
        this.countRangeMax = null;
        this.charityId = null;
        this.donationStatusIds = null;
    }
}

export default GroupedDonationListFilter;

import { action, observable } from 'mobx';
import { FilterParams } from "core/models";

class CharityProcessedDonationFilter extends FilterParams {
    @observable charityId;
    @observable donationStatusIds;

    constructor() {
        super();
        this.reset();
    }

    @action.bound
    reset() {
        super.reset();
        this.charityId = null;
        this.donationStatusIds = null;
    }
}

export default CharityProcessedDonationFilter;

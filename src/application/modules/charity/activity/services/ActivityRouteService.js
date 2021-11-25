import { BaseRouteService } from 'core/services';

class ActivityRouteService extends BaseRouteService {
    constructor() {
        super('activity-and-history');
    }

    findCharityTransactions(filter) {
        return super.find(this.base + '/charity-transactions/{?charityId,dateCreatedFrom,dateCreatedTo,page,rpp,sort,embed,fields,grantsOnly}', filter);
    }
}

export default ActivityRouteService;

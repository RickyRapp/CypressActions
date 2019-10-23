import { BaseRouteService } from 'core/services';

class ActivityAndHistoryRouteService extends BaseRouteService {
    constructor() {
        super('activity-and-history');
    }

    find(filter) {
        return super.find(this.base + '/{?search,donorAccountId,charityId,page,rpp,sort,embed,fields}', filter);
    }

    findDonorPendingTransactions(donorAccountId) {
        return super.find(this.base + '/donor-pending-transactions/{donorAccountId}', donorAccountId);
    }
}

export default ActivityAndHistoryRouteService;

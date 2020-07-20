import { BaseRouteService } from 'core/services';

class ActivityAndHistoryRouteService extends BaseRouteService {
    constructor() {
        super('activity-and-history');
    }

    find(filter) {
        return super.find(this.base + '/{?search,donorId,charityId,page,rpp,sort,embed,fields}', filter);
    }

    findDonorPendingTransactions(donorId) {
        return super.find(this.base + '/donor-pending-transactions/{donorId}', donorId);
    }
}

export default ActivityAndHistoryRouteService;

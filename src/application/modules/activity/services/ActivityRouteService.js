import { BaseRouteService } from 'core/services';

class ActivityRouteService extends BaseRouteService {
    constructor() {
        super('activity-and-history');
    }

    find(filter) {
        return super.find(this.base + '/{?search,donorId,charityId,page,rpp,sort,embed,fields}', filter);
    }

    findDonorPendingTransactions(donorId) {
        return super.find(this.base + '/donor-pending-transactions/{donorId}', donorId);
    }

    findTransactions(filter) {
        return super.find(this.base + '/transactions/{?userId,donorId,dateCreatedFrom,dateCreatedTo,page,rpp,sort,embed,fields}', filter);
    }

    loadDonorData(id) {
        return super.get(this.base + '/donor-information/{id}', id);
    }
}

export default ActivityRouteService;

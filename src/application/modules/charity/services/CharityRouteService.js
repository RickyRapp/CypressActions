import { BaseRouteService } from 'core/services';

class CharityRouteService extends BaseRouteService {
    constructor() {
        super('charity');
    }

    find(filter) {
        return super.find(this.base + '/{?search,charityId,page,rpp,sort,embed,fields}', filter);
    }

    search(filter) {
        return super.find(this.base + '/search/{?id,searchQuery,page,rpp,sort,embed,fields,exceptId}', filter);
    }

    findDonorPendingTransactions(donorAccountId) {
        return super.find(this.base + '/donor-pending-transactions/{donorAccountId}', donorAccountId);
    }
}

export default CharityRouteService;

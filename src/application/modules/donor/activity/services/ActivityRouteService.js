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
        return super.find(this.base + '/transactions/{?donorId,searchQuery,dateCreatedFrom,dateCreatedTo,paymentTransactionType,page,rpp,sort,embed,fields}', filter);
    }

    findPendingCheck(filter) {
        return super.find('session-pending-certificate' + '/{?sessionPendingCertificateStatusIds,donorId,page,rpp,sort,embed,fields}', filter);
    }

    findCharityTransactions(filter) {
        return super.find(this.base + '/charity-transactions/{?charityId,dateCreatedFrom,dateCreatedTo,page,rpp,sort,embed,fields}', filter);
    }

    loadDonorData(id) {
        return super.get(this.base + '/donor-information/{id}', id);
    }

    findDonorToDonorTransactions(filter) {
        return super.find(this.base + '/donor-to-donor-transactions/{?donorId,searchQuery,dateCreatedFrom,dateCreatedTo,page,rpp,sort,embed,fields}', filter);
    }

}

export default ActivityRouteService;

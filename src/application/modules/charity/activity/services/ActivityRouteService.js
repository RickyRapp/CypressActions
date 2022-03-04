import { BaseRouteService } from 'core/services';

class ActivityRouteService extends BaseRouteService {
    constructor() {
        super('activity-and-history');
    }

    findCharityTransactions(filter) {
        return super.find(this.base + '/charity-transactions/{?charityId,dateCreatedFrom,dateCreatedTo,page,rpp,sort,embed,fields,grantsOnly}', filter);
    }

    findPendingCheck(filter) {
        return super.find('session-pending-certificate' + '/{?sessionPendingCertificateStatusIds,charityId,page,rpp,sort,embed,fields}', filter);
    }
}

export default ActivityRouteService;

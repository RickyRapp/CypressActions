import { BaseRouteService } from 'core/services';

class ActivityRouteService extends BaseRouteService {
    constructor() {
        super('activity-and-history');
    }

    findCharityTransactions(filter) {
        return super.find(this.base + '/charity-transactions/{?charityId,dateCreatedFrom,dateCreatedTo,paymentTransactionType,page,rpp,sort,embed,fields,grantsOnly}', filter);
    }

    findPendingCheck(filter) {
        return super.find('session-pending-certificate' + '/{?sessionPendingCertificateStatusIds,charityId,page,rpp,sort,embed,fields}', filter);
    }

    getDashboardChartData(filter) {
        return super.create(this.base + '/charity-dashboard-chart', filter)
    }

    getCharityDetailedTransactions(id){
        return super.get(this.base + '/charity-transactions-detailed/'+ '{id}', id);
    }
}

export default ActivityRouteService;

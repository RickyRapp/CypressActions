import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { findParams } from 'core/utils';

class ActivityAndHistoryRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'activity-and-history/';
        this.uriTemplateService = uritemplate;
    }

    find(filter) {
        return super.find(this.base + '{?donorAccountId,done,paymentTransactionTypeIds,paymentTransactionStatusIds,done,amountRangeMin,amountRangeMax,pending,page,rpp,sort,embed,fields}', filter);
    }

    findDonorPendingTransactions(donorAccountId) {
        return super.find(this.base + 'donor-pending-transactions/{donorAccountId}', donorAccountId);
    }
}

export default ActivityAndHistoryRouteService;

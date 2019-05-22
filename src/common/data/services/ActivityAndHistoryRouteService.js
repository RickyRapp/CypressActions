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
        return super.find(this.base + '/{?donorAccountId,done,paymentTransactionTypeId,paymentTransactionStatusId,amountRangeMin,amountRangeMax,page,rpp,sort,embed,fields,searchFields}', filter);
    }
}

export default ActivityAndHistoryRouteService;

import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { getParams } from 'core/utils';

class GrantScheduledPaymentRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'grant-scheduled-payment/';
        this.uriTemplateService = uritemplate;
        this.queryParams = 'donorAccountId,amountRangeMin,amountRangeMax,charityId,dateCreatedStartDate,dateCreatedEndDate,page,rpp,sort,embed,searchFields';
    }

    find(filter) {
        return super.find(this.base + `{?${this.queryParams}}`, filter);
    }

    create(resource) {
        return super.create(this.base, resource);
    }
}

export default GrantScheduledPaymentRouteService;

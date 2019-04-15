import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { getParams } from 'core/utils';

class FundTransferRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'fund-transfer/';
        this.uriTemplateService = uritemplate;
        this.queryParams = 'donorAccountId,amountRangeMin,amountRangeMax,senderDonorAccountId,recipientDonorAccountId,dateCreatedStartDate,dateCreatedEndDate,page,rpp,sort,embed,searchFields';
    }

    find(filter) {
        return super.find(this.base + `{?${this.queryParams}}`, filter);
    }

    create(resource) {
        return super.create(this.base, resource);
    }
}

export default FundTransferRouteService;

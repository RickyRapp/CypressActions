import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { getParams } from 'core/utils';

class FundTransferRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'fund-transfer/';
        this.uriTemplateService = uritemplate;
        this.queryParams = 'amountRangeMin,amountRangeMax,senderDonorAccountId,recipientDonorAccountId,dateCreatedStartDate,dateCreatedEndDate,page,rpp,sort,embed,searchFields';
    }

    find(id, filter) {
        let url = this.base + 'list/';
        if (id) {
            const params = getParams({ id: id });
            url = this.uriTemplateService.parse(url + '{id}/').expand(params);
        }
        return super.find(url + `{?${this.queryParams}}`, filter);
    }

    create(resource) {
        return super.create(this.base, resource);
    }
}

export default FundTransferRouteService;

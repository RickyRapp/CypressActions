import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { getParams } from 'core/utils';

class GrantRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'grant/';
        this.uriTemplateService = uritemplate;
        this.queryParams = 'donorAccountId,amountRangeMin,amountRangeMax,charityId,dateCreatedStartDate,dateCreatedEndDate,page,rpp,sort,embed,searchFields';
    }

    find(filter) {
        return super.find(this.base + `{?${this.queryParams}}`, filter);
    }

    get(id, options) {
        return super.get(this.base + '{id}/{?embed}', id, options);
    }

    create(resource) {
        return super.create(this.base, resource);
    }

    review(resource) {
        return this.uriTemplateService.parse(this.base + 'review/{id}').expand(resource);
    }
}

export default GrantRouteService;

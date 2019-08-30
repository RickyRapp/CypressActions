import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { getParams } from 'core/utils';

class GrantRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'grant/';
        this.uriTemplateService = uritemplate;
        this.queryParams = 'donationId,donorAccountId,amountRangeMin,amountRangeMax,charityId,dateCreatedStartDate,dateCreatedEndDate,page,rpp,sort,embed,fields';
    }

    find(filter) {
        return super.find(this.base + `{?${this.queryParams}}`, filter);
    }

    get(id, options) {
        return super.get(this.base + '{id}/{?embed,fields}', id, options);
    }

    create(resource) {
        return super.create(this.base, resource);
    }

    cancel(resource) {
        return super.cancel(this.base + 'cancel/{id}', resource);
    }

    update(resource) {
        return super.update(this.base + '{id}', resource);
    }
}

export default GrantRouteService;

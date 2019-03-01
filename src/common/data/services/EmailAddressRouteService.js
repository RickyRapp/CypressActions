import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { getParams } from 'core/utils';

class EmailAddressRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'email-address/';
        this.uriTemplateService = uritemplate;
    }

    get(id, options) {
        return super.get(this.base + '{id}/{?embed}', id, options);
    }

    getDonorAccountCollection(id, options) {
        const params = getParams({ id: id, ...options });
        return this.uriTemplateService.parse(this.base + 'donor-account/{id}/{?embed,sort}').expand(params);
    }

    createDonorAccountCollection(id) {
        return this.uriTemplateService.parse(this.base + 'donor-account/{id}').expand(id);
    }

    update() {
        return this.base;
    }

    updateDonorAccountEmailAddresses(resource) {
        return super.update(this.base + 'donor-account-email-addresses/{id}', resource);
    }
}

export default EmailAddressRouteService;

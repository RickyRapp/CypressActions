import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { getParams } from 'core/utils';

class PhoneNumberRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'phone-number/';
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

    updateDonorAccountPhoneNumbers(resource) {
        return super.update(this.base + 'donor-account-phone-numbers/{id}', resource);
    }
}

export default PhoneNumberRouteService;

import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';

class PhoneNumberRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'phone-number/';
        this.uriTemplateService = uritemplate;
    }

    find(filter) {
        return super.find(this.base + '{?page,rpp,sort,embed,fields,searchFields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '{id}/{?embed}', id, options);
    }

    create(id) {
        return super.create(this.base + '{id}', id);
    }

    createDonorAccountCollection(id) {
        return this.uriTemplateService.parse(this.base + 'donor-account/{id}').expand(id);
    }

    update(resource) {
        return super.update(this.base + '{id}', resource);
    }

    updateCollection() {
        return this.base;
    }

    updateDonorAccountPhoneNumbers(resource) {
        return super.update(this.base + 'donor-account-phone-numbers/{id}', resource);
    }

    delete(resource) {
        return super.delete(this.base + '{id}', resource);
    }
}

export default PhoneNumberRouteService;

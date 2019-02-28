import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';

class EmailAddressRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'email-address/';
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

    updateDonorAccountEmailAddresses(resource) {
        return super.update(this.base + 'donor-account-email-addresses/{id}', resource);
    }

    delete(resource) {
        return super.delete(this.base + '{id}', resource);
    }
}

export default EmailAddressRouteService;

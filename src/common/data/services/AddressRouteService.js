import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';

class AddressRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'address/';
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

    createCollection(id) {
        return this.uriTemplateService.parse(this.base + '{id}').expand(id);
    }

    update(resource) {
        return super.update(this.base + '{id}', resource);
    }

    updateCollection(id) {
        return this.uriTemplateService.parse(this.base + '{id}').expand(id);
    }

    updateDonorAccountAddresses(resource) {
        return super.update(this.base + 'donor-account-addresses/{id}', resource);
    }

    delete(resource) {
        return super.delete(this.base + '{id}', resource);
    }
}

export default AddressRouteService;

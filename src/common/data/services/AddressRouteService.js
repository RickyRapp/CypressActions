import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { getParams } from 'core/utils';

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

    getDonorAccountCollection(id, options) {
        const params = getParams({ id: id, ...options });
        return this.uriTemplateService.parse(this.base + 'donor-account/{id}/{?embed,sort}').expand(params);
    }

    create(id) {
        return super.create(this.base + '{id}', id);
    }

    createDonorAccountCollection(id) {
        return this.uriTemplateService.parse(this.base + 'donor-account/{id}').expand(id);
    }

    update() {
        return this.base;
    }

    updateDonorAccountAddresses(resource) {
        return super.update(this.base + 'donor-account-addresses/{id}', resource);
    }

    delete(resource) {
        return super.delete(this.base + '{id}', resource);
    }
}

export default AddressRouteService;

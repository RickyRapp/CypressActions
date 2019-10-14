import { BaseRouteService } from 'core/services';

class EmailAddressRouteService extends BaseRouteService {
    constructor() {
        super('email-address');
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,charityId,page,rpp,sort,embed,searchFields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    update(resource) {
        return super.update(this.base, resource);
    }

    markPrimary(resource) {
        return super.update(this.base + '/mark-primary/{id}', resource);
    }

    createDonorAccountEmailAddress(resource) {
        return super.create(this.base + '/donor-account/{donorAccountId}', resource);
    }
}

export default EmailAddressRouteService;

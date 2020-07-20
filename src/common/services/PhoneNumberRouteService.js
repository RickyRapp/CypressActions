import { BaseRouteService } from 'core/services';

class PhoneNumberRouteService extends BaseRouteService {
    constructor() {
        super('phone-number');
    }

    find(filter) {
        return super.find(this.base + '/{?donorId,page,rpp,sort,embed,searchFields}', filter);
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

    createDonorPhoneNumber(resource) {
        return super.create(this.base + '/donor/{donorId}', resource);
    }
}

export default PhoneNumberRouteService;

import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { findParams } from 'core/utils';

class PhoneNumberRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'phone-number/';
        this.uriTemplateService = uritemplate;
    }

    find(filter) {
        return super.find(this.base + '{?donorAccountId,page,rpp,sort,embed,searchFields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '{id}/{?embed}', id, options);
    }

    createPhoneNumber(route, userId) {
        return this.uriTemplateService.parse(this.base + route + '/{userId}').expand({ userId: userId });
    }

    markPrimary(route, id) {
        return this.uriTemplateService.parse(this.base + route + '/{id}').expand({ id: id });
    }

    update() {
        return this.base;
    }
}

export default PhoneNumberRouteService;

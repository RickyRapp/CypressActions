import { BaseRouteService } from 'core/services';

class GrantRequestRouteService extends BaseRouteService {
    constructor() {
        super('grant-request');
    }

    find(filter) {
        return super.find(this.base + '/{?donorId,charityId,search,page,rpp,sort,embed,fields}', filter);
    }

    findCharityGrantRequest(filter) {
        return super.find(this.base + '/charity-grant-request/{?charityId,search,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    create() {
        return super.create(this.base);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    complete(resource) {
        return super.update(this.base + '/complete/{id}', resource);
    }

    decline(resource) {
        return super.update(this.base + '/decline/{id}', resource);
    }

    cancel(resource) {
        return super.update(this.base + '/cancel/{id}', resource);
    }
}

export default GrantRequestRouteService;

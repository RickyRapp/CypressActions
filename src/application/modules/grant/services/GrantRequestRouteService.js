import { BaseRouteService } from 'core/services';

class GrantRequestRouteService extends BaseRouteService {
    constructor() {
        super('grant-request');
        this.filterFields = ''
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,charityId,search,page,rpp,sort,embed,fields}', filter);
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

    decline(resource) {
        return super.update(this.base + '/decline/{id}', resource);
    }

    cancel(resource) {
        return super.update(this.base + '/cancel/{id}', resource);
    }
}

export default GrantRequestRouteService;

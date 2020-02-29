import { BaseRouteService } from 'core/services';

class GrantRequestRouteService extends BaseRouteService {
    constructor() {
        super('grant-request');
        this.filterFields = ''
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,charityId,confirmationNumber,donationStatusIds,search,name,taxId,grantId,page,rpp,sort,embed,fields}', filter);
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
}

export default GrantRequestRouteService;

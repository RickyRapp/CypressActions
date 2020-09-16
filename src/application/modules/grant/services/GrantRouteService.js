import { BaseRouteService } from 'core/services';

class GrantRouteService extends BaseRouteService {
    constructor() {
        super('grant');
        this.filterFields = 'userId,donorId,charityId,confirmationNumber,donationStatusIds,search,name,taxId,grantId,page,rpp,sort,embed,fields'
    }

    find(filter) {
        return super.find(this.base + `/{?${this.filterFields}}`, filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    getDonorInformation(id) {
        return super.get(this.base + '/donor-information/{id}', id);
    }

    create() {
        return super.create(this.base);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    review(resource) {
        return super.update(this.base + '/review/{id}', resource);
    }

    export(filter) {
        return super.find(this.base + `/search-export/{?exportFields,exportLimit,exportType,${this.filterFields}}`, filter);
    }
}

export default GrantRouteService;

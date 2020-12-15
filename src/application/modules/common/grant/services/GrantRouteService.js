import { BaseRouteService } from 'core/services';

class GrantRouteService extends BaseRouteService {
    constructor() {
        super('grant');
        this.filterFields = 'donorId,charityId,confirmationNumber,donationStatusIds,search,name,taxId,grantId,page,rpp,sort,embed,fields'
    }

    find(filter) {
        return super.find(this.base + `/{?${this.filterFields}}`, filter);
    }

    findSummaryPastGrant(params) {
        return super.find(this.base + '/summary/{?donorId,charityId,donationStatusIds,donationTypeIds,embed,fields}', params);
    }

    findPastGrant(params) {
        return super.find(this.base + '/donor/{?donorId,charityId,donationStatusIds,donationTypeIds,embed,fields}', params);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?donorId,embed,fields}', id, options);
    }

    getDonorInformation(id) {
        return super.get(this.base + '/donor-information/{id}', id);
    }

    create() {
        return super.create(this.base);
    }

    createCharityGivingCard() {
        return super.create(this.base + '/charity-giving-card');
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

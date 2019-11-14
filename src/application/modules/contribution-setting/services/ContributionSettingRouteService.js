import { BaseRouteService } from 'core/services';

class ContributionSettingRouteService extends BaseRouteService {
    constructor() {
        super('contribution-setting');
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,contributionSettingTypeIds,amountRangeMin,amountRangeMax,dateCreatedFrom,dateCreatedTo,search,contributionSettingId,page,rpp,sort,embed,fields}', filter);
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

    cancel(resource) {
        return super.update(this.base + '/cancel/{id}', resource);
    }
}

export default ContributionSettingRouteService;

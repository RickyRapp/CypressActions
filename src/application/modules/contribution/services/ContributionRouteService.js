import { BaseRouteService } from 'core/services';

class ContributionRouteService extends BaseRouteService {
    constructor() {
        super('contribution');
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,search,name,taxId,contributionId,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    create() {
        return super.create(this.base);
    }

    createSetting() { //TODO move in separate ContributionSettingService
        return super.create('contribution-setting');
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    review(resource) {
        return super.update(this.base + '/review/{id}', resource);
    }
}

export default ContributionRouteService;

import { BaseRouteService } from 'core/services';

class ScheduledGrantRouteService extends BaseRouteService {
    constructor() {
        super('grant-scheduled-payment');
    }

    find(filter) {
        return super.find(this.base + '/{?donorId,search,charityId,dateCreatedFrom,dateCreatedTo,dollarRange,name,taxId,grantId,page,rpp,sort,embed,fields,isFinished}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?donorId,embed,fields}', id, options);
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

export default ScheduledGrantRouteService;
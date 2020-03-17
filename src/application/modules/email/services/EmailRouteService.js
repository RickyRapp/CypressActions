import { BaseRouteService } from 'core/services';

class EmailRouteService extends BaseRouteService {
    constructor() {
        super('email');
        this.filterFields = 'donorAccountId,charityId,search,name,page,rpp,sort,embed,fields'
    }

    find(filter) {
        return super.find(this.base + `/{?${this.filterFields}}`, filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }
}

export default EmailRouteService;

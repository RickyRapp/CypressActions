import { BaseRouteService } from 'core/services';

class CharityRouteService extends BaseRouteService {
    constructor() {
        super('charity');
    }

    find(filter) {
        return super.find(this.base + '/{?search,name,taxId,charityId,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    search(filter) {
        return super.find(this.base + '/search/{?id,searchQuery,page,rpp,sort,embed,fields,exceptId}', filter);
    }
}

export default CharityRouteService;

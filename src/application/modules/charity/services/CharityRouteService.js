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

    create() {
        return super.create(this.base);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    search(filter) {
        return super.find(this.base + '/search/{?id,search,page,rpp,sort,embed,fields,exceptId}', filter);
    }

    taxIdExists(taxId) {
        return super.get(this.base + '/tax-id/{taxId}/exists/', null, { taxId: taxId });
    }
}

export default CharityRouteService;

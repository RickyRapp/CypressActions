import { BaseRouteService } from 'core/services';

class GivingCardRouteService extends BaseRouteService {
    constructor() {
        super('fidelity-recommendation-card');
    }

    find(filter) {
        return super.find(this.base + '/{?donorId,search,name,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }
}

export default GivingCardRouteService;

import { BaseRouteService } from 'core/services';

class DonorNoteRouteService extends BaseRouteService {
    constructor() {
        super('donor-note');
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,search,name,page,rpp,sort,embed,fields}', filter);
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

    review(resource) {
        return super.update(this.base + '/review/{id}', resource);
    }
}

export default DonorNoteRouteService;

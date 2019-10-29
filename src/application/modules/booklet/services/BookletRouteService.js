import { BaseRouteService } from 'core/services';

class BookletRouteService extends BaseRouteService {
    constructor() {
        super('booklet');
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,exceptIds,bookletStatusIds,denominationTypeIds,codes,certificateBarcodes,dateCreatedStartDate,dateCreatedEndDate,page,rpp,sort,embed,fields}', filter);
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

    updateCertificate(resource) {
        return super.update('certificate', resource);
    }

    inventory() {
        return super.get(this.base + 'inventory');
    }
}

export default BookletRouteService;

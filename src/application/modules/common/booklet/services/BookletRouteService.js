import { BaseRouteService } from 'core/services';

class BookletRouteService extends BaseRouteService {
    constructor() {
        super('booklet');
    }

    find(filter) {
        return super.find(this.base + '/{?donorId,exceptIds,trackingNumber,deliveryMethodTypeIds,bookletStatusIds,bookletTypeIds,denominationTypeIds,donorsName,codes,certificateBarcodes,dateCreatedStartDate,dateCreatedEndDate,page,rpp,sort,embed,fields}', filter);
    }

    remainingAmount(donorId) {
        return super.get(this.base + '/remaining/{id}', donorId);
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
    export(resource) {
        return super.find(this.base + '/export{?codeEnd,codeStart}', resource)
    }
}

export default BookletRouteService;
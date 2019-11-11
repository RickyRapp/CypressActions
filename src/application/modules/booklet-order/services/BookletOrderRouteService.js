import { BaseRouteService } from 'core/services';

class BookletOrderRouteService extends BaseRouteService {
    constructor() {
        super('booklet-order');
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,search,trackingNumber,deliveryMethodTypeIds,bookletCodes,bookletOrderStatusIds,name,taxId,page,rpp,sort,embed,fields}', filter);
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

export default BookletOrderRouteService;

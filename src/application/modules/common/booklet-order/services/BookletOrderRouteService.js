import { BaseRouteService } from 'core/services';

class BookletOrderRouteService extends BaseRouteService {
    constructor() {
        super('booklet-order');
    }

    find(filter) {
        return super.find(this.base + '/{?donorId,search,trackingNumber,dateCreatedFrom,dateCreatedTo,confirmationNumber,deliveryMethodTypeIds,bookletCodes,bookletOrderStatusIds,name,orderFolder,taxId,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    getDonorInformation(id) {
        return super.get(this.base + '/donor-information/{id}', id);
    }

    create() {
        return super.create(this.base);
    }

    generateReport(resource) {
        return super.update(this.base + '/export-selection/{?ids,sendTo}', resource);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    cancel(resource) {
        return super.update(this.base + '/cancel/{id}', resource);
    }

    review(resource) {
        return super.update(this.base + '/review/{id}', resource);
    }

    folderFind(resource) {
        return super.find(this.base + '/booklet-folders/{?page,rpp}', resource);
    }

    folderReview(resource) {
        return super.find(this.base + '/booklet-folders/{id}', resource);
    }
}

export default BookletOrderRouteService;

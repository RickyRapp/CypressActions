import { BaseRouteService } from 'core/services';

class CreditDebitRouteService extends BaseRouteService {
    constructor() { 
        super('credit-debit');
    }

    find(filter) {
        return super.find(this.base + '/{?donorId,charityId,userType,search,trackingNumber,dateCreatedFrom,dateCreatedTo,confirmationNumber,deliveryMethodTypeIds,bookletCodes,bookletOrderStatusIds,name,taxId,page,rpp,sort,embed,fields}', filter);
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

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    review(resource) {
        return super.update(this.base + '/review/{id}', resource);
    }
}

export default CreditDebitRouteService;
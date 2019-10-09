import { BaseRouteService } from 'core/services';

class BankAccountRouteService extends BaseRouteService {
    constructor() {
        super('bank-account');
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,page,rpp,sort,embed,searchFields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    update(resource) {
        return super.update(this.base, resource);
    }

    createDonorAccountBankAccount(resource) {
        return super.create(this.base + '/donor-account/{donorAccountId}', resource);
    }
}

export default BankAccountRouteService;

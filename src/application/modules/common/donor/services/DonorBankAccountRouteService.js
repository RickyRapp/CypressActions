import { BaseRouteService } from 'core/services';

class DonorBankAccountRouteService extends BaseRouteService {
  constructor() {
    super('donor-bank-account');
  }

  find(filter) {
    return super.find(this.base + '/{?donorId,page,rpp,sort,embed,searchFields,onlyVerified}', filter);
  }

  get(id, options) {
    return super.get(this.base + '/{id}/{?embed,fields}', id, options);
  }

  getBankAccountAccountNumber(id) {
    return super.get(this.base + '/account-number/{id}', id);
  }

  create() {
    return super.create(this.base);
  }

  delete(resource) {
    return super.delete(this.base + '/{donorId}/{id}', resource);
  }

  update(resource) {
    return super.update(this.base + '/{id}', resource);
  }

  verifyDonorBank(resource){
    return super.update(this.base + '/verify/{id}', resource);
  }
}

export default DonorBankAccountRouteService;

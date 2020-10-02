import { BaseRouteService } from 'core/services';

class DonorBankAccountRouteService extends BaseRouteService {
  constructor() {
    super('donor-bank-account');
  }

  find(filter) {
    return super.find(this.base + '/{?userId,donorId,page,rpp,sort,embed,searchFields}', filter);
  }

  get(id, options) {
    return super.get(this.base + '/{id}/{?embed,fields}', id, options);
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
}

export default DonorBankAccountRouteService;

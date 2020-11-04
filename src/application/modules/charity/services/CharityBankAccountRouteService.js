import { BaseRouteService } from 'core/services';

class CharityBankAccountRouteService extends BaseRouteService {
  constructor() {
    super('charity-bank-account');
  }

  find(filter) {
    return super.find(this.base + '/{?charityId,page,rpp,sort,embed,searchFields}', filter);
  }

  get(id, options) {
    return super.get(this.base + '/{id}/{?embed,fields}', id, options);
  }

  create() {
    return super.create(this.base);
  }

  delete(resource) {
    return super.delete(this.base + '/{charityId}/{id}', resource);
  }

  update(resource) {
    return super.update(this.base + '/{id}', resource);
  }
}

export default CharityBankAccountRouteService;

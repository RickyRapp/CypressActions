import { BaseRouteService } from 'core/services';

class WithdrawSettingsRouteService extends BaseRouteService {
  constructor() {
    super('withdraw-settings');
  }

  find(filter) {
    return super.find(this.base + '/{?charityId,page,rpp,sort,embed,searchFields}', filter);
  }

  get(id, options) {
    return super.get(this.base + '/{id}/{?embed,fields}', id, options);
  }

  getbyParty(id){
      return super.get(this.base + '/party/{id}', id, null);
  }

  create() {
    return super.create(this.base);
  }

  update(resource) {
    return super.update(this.base + '/{id}', resource);
  }
}

export default WithdrawSettingsRouteService;

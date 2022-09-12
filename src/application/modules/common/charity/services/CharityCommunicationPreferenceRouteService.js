import { BaseRouteService } from 'core/services';

class CharityCommunicationPreferenceRouteService extends BaseRouteService {
  constructor() {
    super('charity-communication-preference');
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

  update(resource) {
    return super.update(this.base + '/{id}', resource);
  }

  getDonorCommunicationEmail(id){
    return super.get(this.base + '/communication-email/{id}', id, null);
  }
}

export default CharityCommunicationPreferenceRouteService;

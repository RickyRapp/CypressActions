import { BaseRouteService } from 'core/services';

class CharityApiKeyRouteService extends BaseRouteService {
  constructor() {
    super('charityApiKeys');
  }

  find(filter) {
    return super.find(this.base + '/{?charityId,page,rpp,sort,embed,searchFields}', filter);
  }

  get(id, options) {
    return super.get(this.base + '/{id}/{?embed,fields}', id, options);
  }

  update(resource) {
    return super.update(this.base + '/{id}/regenerate', resource);
  }
}

export default CharityApiKeyRouteService;
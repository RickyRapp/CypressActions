import { BaseRouteService } from 'core/services';

class LookupRouteService extends BaseRouteService {
  constructor(lookupRouteName) {
    super();
    this.base = lookupRouteName;
  }

  find(filter) {
    return super.find(this.base + '{?searchQuery,page,rpp,sort,embed,fields,searchFields}', filter);
  }

  get(id, options) {
    return super.get(this.base + '{id}/{?embed}', id, options);
  }

  getAll() {
    return super.get(this.base + 'get-all');
  }

  create() {
    return super.create(this.base + 'register');
  }

  update(resource) {
    return super.update(this.base + '{id}', resource);
  }

  delete(resource) {
    return super.delete(this.base + '{id}', resource);
  }
}

export default LookupRouteService;

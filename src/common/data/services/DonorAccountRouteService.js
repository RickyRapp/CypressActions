import { BaseRouteService } from 'core/services';

class DonorAccountRouteService extends BaseRouteService {
  constructor() {
    super();
    this.base = 'donor-account/';
  }

  find(filter) {
    return super.find(this.base + '{?firstName,lastName,emails,page,rpp,sort,embed,fields,searchFields}', filter);
  }

  get(id, options) {
    return super.get(this.base + '{id}/{?embed}', id, options);
  }

  getSettings(id) {
    return super.get(this.base + 'settings/' + '{id}', id);
  }

  create() {
    return super.create(this.base);
  }

  register() {
    return super.create(this.base + 'register');
  }

  update(resource) {
    return super.update(this.base + '{id}', resource);
  }

  updateSettings(resource) {
    return super.update(this.base + 'settings/' + '{id}', resource);
  }

  delete(resource) {
    return super.delete(this.base + '{id}', resource);
  }

  search(filter) {
    return super.find(this.base + 'search/{?id,searchQuery,page,rpp,sort,embed,fields,exceptId}', filter);
  }
}

export default DonorAccountRouteService;

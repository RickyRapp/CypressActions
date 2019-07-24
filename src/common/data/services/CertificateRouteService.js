import { BaseRouteService } from 'core/services';

class CertificateRouteService extends BaseRouteService {
  constructor() {
    super();
    this.base = 'certificate/';
    this.queryParams = 'rpp,sort,embed,fields';
  }

  find(filter) {
    return super.find(this.base + `{?${this.queryParams}}`, filter);
  }

  get(id, options) {
    return super.get(this.base + '{id}/{?embed,fields}', id, options);
  }

  create() {
    return super.create(this.base);
  }

  update(resource) {
    return super.update(this.base, resource);
  }
}

export default CertificateRouteService;

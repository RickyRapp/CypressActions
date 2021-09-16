import { BaseRouteService } from 'core/services';

class DonorBankAccountRouteService extends BaseRouteService {
  constructor() {
    super('donor-record-activity');
  }

  find(filter) {
    return super.find(this.base + '/{?donorId,page,rpp,sort,embed,searchFields}', filter);
  }

  get(id, options) {
    return super.get(this.base + '/{id}/{?embed,fields}', id.donorId, options);
  }

  create() {
    return super.create(this.base);
  }

  update(resource) {
    return super.update(this.base + '/{id}', resource);
  }
}

export default DonorBankAccountRouteService;

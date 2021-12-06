import { BaseRouteService } from 'core/services';

class DonorGivingCardSettingRouteService extends BaseRouteService {
  constructor() {
    super('giving-card-setting');
  }

  find(filter) {
    return super.find(this.base + '/{?donorId,page,rpp,sort,embed,searchFields}', filter);
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

  activateCard(resource) {
    return super.update(this.base + '/activate-card', resource);
  }
  
  unfreezeCard(resource) {
    return super.update(this.base + '/unfreeze/{id}', resource);
  }
}

export default DonorGivingCardSettingRouteService;

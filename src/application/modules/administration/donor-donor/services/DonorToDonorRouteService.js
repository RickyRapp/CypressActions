import { BaseRouteService } from 'core/services';

class DonorToDonorRouteService extends BaseRouteService {
  constructor() {
    super('donor-to-donor');
  }

  create() {
    return super.create(this.base);
  }

}

export default DonorToDonorRouteService;

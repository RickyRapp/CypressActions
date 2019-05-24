import { BaseRouteService } from 'core/services';

class DonationRouteService extends BaseRouteService {
  constructor() {
    super();
    this.base = 'donation/';
    this.queryParams = 'page,rpp,sort,embed,searchFields';
  }

  find(filter) {
    return super.find(this.base + `{?${this.queryParams}}`, filter);
  }
}

export default DonationRouteService;

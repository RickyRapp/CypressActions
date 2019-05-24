import { DonationRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class DonationService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonationRouteService());
    this.apiClient = apiClient;
  }

  async calculateFee(options) {
    const url = this.routeService.calculateFee(options);
    const response = await this.apiClient.get(url, options);
    return response.data || null;
  }
}

export default DonationService;

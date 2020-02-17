import { BaseService } from 'core/services';
import DonorAccountContributionSettingRouteService from './DonorAccountContributionSettingRouteService';

class DonorAccountContributionSettingService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorAccountContributionSettingRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorAccountContributionSettingService;

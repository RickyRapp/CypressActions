import { BaseService } from 'core/services';
import DonorContributionSettingRouteService from './DonorContributionSettingRouteService';

class DonorContributionSettingService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorContributionSettingRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorContributionSettingService;

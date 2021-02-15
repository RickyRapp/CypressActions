import { BaseService } from 'core/services';
import DonorGivingCardSettingRouteService from './DonorGivingCardSettingRouteService';

class DonorGivingCardSettingService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorGivingCardSettingRouteService());
    this.apiClient = apiClient;
  }

  activateCard(resource) {
    const url = this.routeService.activateCard(resource);
    return this.apiClient.put(url, resource);
  }
}

export default DonorGivingCardSettingService;

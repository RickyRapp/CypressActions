import { BaseService } from 'core/services';
import DonorGivingCardSettingRouteService from './DonorGivingCardSettingRouteService';

class DonorGivingCardSettingService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorGivingCardSettingRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorGivingCardSettingService;

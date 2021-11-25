import { BaseService } from 'core/services';
import DonorGivingGoalRouteService from './DonorGivingGoalRouteService';

class DonorGivingCardSettingService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorGivingGoalRouteService());
    this.apiClient = apiClient;
  }

}

export default DonorGivingCardSettingService;

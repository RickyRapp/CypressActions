import { BaseService } from 'core/services';
import DonorCommunicationPreferenceRouteService from './DonorCommunicationPreferenceRouteService';

class DonorCommunicationPreferenceService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorCommunicationPreferenceRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorCommunicationPreferenceService;

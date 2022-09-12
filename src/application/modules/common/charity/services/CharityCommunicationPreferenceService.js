import { BaseService } from 'core/services';
import CharityCommunicationPreferenceRouteService from './CharityCommunicationPreferenceRouteService';

class CharityCommunicationPreferenceService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new CharityCommunicationPreferenceRouteService());
    this.apiClient = apiClient;
  }

  getDonorCommunicationEmail(id) {
    const url = this.routeService.getDonorCommunicationEmail(id);
    return this.apiClient.get(url);
}
}

export default CharityCommunicationPreferenceService;

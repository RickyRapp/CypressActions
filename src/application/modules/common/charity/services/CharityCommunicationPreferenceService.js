import { BaseService } from 'core/services';
import CharityCommunicationPreferenceRouteService from './CharityCommunicationPreferenceRouteService';

class CharityCommunicationPreferenceService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new CharityCommunicationPreferenceRouteService());
    this.apiClient = apiClient;
  }
}

export default CharityCommunicationPreferenceService;

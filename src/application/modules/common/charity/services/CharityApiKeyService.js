import { BaseService } from 'core/services';
import CharityApiKeyRouteService from './CharityApiKeyRouteService';

class CharityApiKeyService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new CharityApiKeyRouteService());
    this.apiClient = apiClient;
  }
}

export default CharityApiKeyService;

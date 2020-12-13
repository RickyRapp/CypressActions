import { BaseService } from 'core/services';
import CharityAddressRouteService from './CharityAddressRouteService';

class CharityAddressService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new CharityAddressRouteService());
    this.apiClient = apiClient;
  }
}

export default CharityAddressService;

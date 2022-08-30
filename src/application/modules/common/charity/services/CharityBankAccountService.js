import { BaseService } from 'core/services';
import CharityBankAccountRouteService from './CharityBankAccountRouteService';

class CharityBankAccountService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new CharityBankAccountRouteService());
    this.apiClient = apiClient;
  }

  verifyCharityBank(resource) {
    const url = this.routeService.verifyCharityBank(resource);
    return this.apiClient.put(url, resource);
}
}

export default CharityBankAccountService;

import { BaseService } from 'core/services';
import CharityBankAccountRouteService from './CharityBankAccountRouteService';

class CharityBankAccountService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new CharityBankAccountRouteService());
    this.apiClient = apiClient;
  }
}

export default CharityBankAccountService;

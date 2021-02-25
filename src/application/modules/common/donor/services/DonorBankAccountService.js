import { BaseService } from 'core/services';
import DonorBankAccountRouteService from './DonorBankAccountRouteService';

class DonorBankAccountService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorBankAccountRouteService());
    this.apiClient = apiClient;
  }

  getBankAccountAccountNumber(id) {
    const url = this.routeService.getBankAccountAccountNumber(id);
    return this.apiClient.get(url);
  }
}

export default DonorBankAccountService;

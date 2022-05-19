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

  verifyDonorBank(resource) {
    const url = this.routeService.verifyDonorBank(resource);
    return this.apiClient.put(url, resource);
}
}

export default DonorBankAccountService;

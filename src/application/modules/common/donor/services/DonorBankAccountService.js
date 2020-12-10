import { BaseService } from 'core/services';
import DonorBankAccountRouteService from './DonorBankAccountRouteService';

class DonorBankAccountService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorBankAccountRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorBankAccountService;

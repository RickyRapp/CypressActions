import { BaseService } from 'core/services';
import DonorAccountBankAccountRouteService from './DonorAccountBankAccountRouteService';

class DonorAccountBankAccountService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorAccountBankAccountRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorAccountBankAccountService;

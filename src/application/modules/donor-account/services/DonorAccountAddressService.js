import { BaseService } from 'core/services';
import DonorAccountAddressRouteService from './DonorAccountAddressRouteService';

class DonorAccountAddressService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorAccountAddressRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorAccountAddressService;

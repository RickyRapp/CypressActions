import { BaseService } from 'core/services';
import DonorAddressRouteService from './DonorAddressRouteService';

class DonorAddressService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorAddressRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorAddressService;

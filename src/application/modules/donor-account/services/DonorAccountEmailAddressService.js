import { BaseService } from 'core/services';
import DonorAccountEmailAddressRouteService from './DonorAccountEmailAddressRouteService';

class DonorAccountEmailAddressService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorAccountEmailAddressRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorAccountEmailAddressService;

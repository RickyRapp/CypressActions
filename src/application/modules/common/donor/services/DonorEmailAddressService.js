import { BaseService } from 'core/services';
import DonorEmailAddressRouteService from './DonorEmailAddressRouteService';

class DonorEmailAddressService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorEmailAddressRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorEmailAddressService;

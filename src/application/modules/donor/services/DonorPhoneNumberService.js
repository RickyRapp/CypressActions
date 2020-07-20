import { BaseService } from 'core/services';
import DonorPhoneNumberRouteService from './DonorPhoneNumberRouteService';

class DonorPhoneNumberService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorPhoneNumberRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorPhoneNumberService;

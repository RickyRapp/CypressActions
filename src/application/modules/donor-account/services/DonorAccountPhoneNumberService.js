import { BaseService } from 'core/services';
import DonorAccountPhoneNumberRouteService from './DonorAccountPhoneNumberRouteService';

class DonorAccountPhoneNumberService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorAccountPhoneNumberRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorAccountPhoneNumberService;

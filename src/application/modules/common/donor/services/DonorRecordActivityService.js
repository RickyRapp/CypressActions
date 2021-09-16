import { BaseService } from 'core/services';
import DonorRecordActivityRouteService from './DonorRecordActivityRouteService';

class DonorRecordActivityService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorRecordActivityRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorRecordActivityService;

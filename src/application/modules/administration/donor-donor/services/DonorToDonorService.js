import { BaseService } from 'core/services';
import DonorToDonorRouteService from './DonorToDonorRouteService';

class DonorToDonorService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorToDonorRouteService());
    this.apiClient = apiClient;
  }

  createTransaction(resource) {
    const url = this.routeService.create(resource);
    return this.apiClient.post(url, resource);
  }
}

export default DonorToDonorService;

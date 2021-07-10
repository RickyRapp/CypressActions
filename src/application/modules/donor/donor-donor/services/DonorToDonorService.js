import { BaseService } from 'core/services';
import DonorToDonorRouteService from './DonorToDonorRouteService';

class DonorToDonorService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new DonorToDonorRouteService());
        this.apiClient = apiClient;
    }

    loadDonorData(donorId) {
        const url = this.routeService.loadDonorData(donorId);
        return this.apiClient.get(url);
    }

    findDonorToDonorAsync(filter) {
        const url = this.routeService.find(filter);
        return this.apiClient.get(url);
    }

    createTransaction(resource) {
        const url = this.routeService.create(resource);
        return this.apiClient.post(url, resource);
      }
}

export default DonorToDonorService;
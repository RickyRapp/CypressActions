import { BaseService } from 'core/services';
import ActivityRouteService from './ActivityRouteService';

class ActivityService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ActivityRouteService());
        this.apiClient = apiClient;
    }

    findDonorPendingTransactions(donorId) {
        const url = this.routeService.findDonorPendingTransactions(donorId);
        return this.apiClient.get(url);
    }

    findTransactions(filter) {
        const url = this.routeService.findTransactions(filter);
        return this.apiClient.get(url);
    }

    findPendingCheck(filter) {
        const url = this.routeService.findPendingCheck(filter);
        return this.apiClient.get(url);
    }

    findPendingCharityCheck(filter) {
        const url = this.routeService.findPendingCharityCheck(filter);
        return this.apiClient.get(url);
    }

    findCharityTransactions(filter) {
        const url = this.routeService.findCharityTransactions(filter);
        return this.apiClient.get(url);
    }

    loadDonorData(donorId) {
        const url = this.routeService.loadDonorData(donorId);
        return this.apiClient.get(url);
    }

    findDonorToDonorTransactions(filter) {
        const url = this.routeService.findDonorToDonorTransactions(filter);
        return this.apiClient.get(url);
    }

}

export default ActivityService;

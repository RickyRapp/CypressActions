import { BaseService } from 'core/services';
import DonationRouteService from './DonationRouteService';

class DonationService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new DonationRouteService());
        this.apiClient = apiClient;
    }

    reviewPendingDonations(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }

    findPendingDonation(params) {
        const url = this.routeService.findPendingDonation(params);
        return this.apiClient.get(url);
    }

    findSummaryPastGrant(params) {
        const url = this.routeService.findSummaryPastGrant(params);
        return this.apiClient.get(url);
    }

    findPastGrant(params) {
        const url = this.routeService.findPastGrant(params);
        return this.apiClient.get(url);
    }

    withdrawFundCharity(resource) {
        const url = this.routeService.withdrawFundCharity(resource);
        return this.apiClient.put(url, resource);
    }
}

export default DonationService;

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

    achBatchCurrentNumber(params) {
        const url = this.routeService.achBatchCurrentNumber(params);
        return this.apiClient.get(url);
    }

    findPendingDonation(params) {
        const url = this.routeService.findPendingDonation(params);
        return this.apiClient.get(url);
    }

    findSummaryPastGrant(params) {
        const url = this.routeService.findSummaryPastGrant(params);
        return this.apiClient.get(url);
    }

    findPastGrant(id) {
        const url = this.routeService.findPastGrant(id);
        return this.apiClient.get(url);
    }

    getPendingDonationsByCharityId(id, address1) {
        const url = this.routeService.getPendingDonationsByCharityId(id, address1);
        var a=this.apiClient.get(url);
        return a;
    }

    withdrawFundCharity(resource) {
        const url = this.routeService.withdrawFundCharity(resource);
        return this.apiClient.put(url, resource);
    }

    getDonationReviewLogs(){
        const url = this.routeService.getDonatonReviews();
        return this.apiClient.get(url);
    }

    getCwtUsingDonationReviewLog(id){
        const url = this.routeService.getCwtUsingDonationReviewLog(id);
        return this.apiClient.get(url);
    }

}

export default DonationService;

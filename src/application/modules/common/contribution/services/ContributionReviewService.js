import { BaseService } from 'core/services';
import ContributionReviewRouteService from './ContributionReviewRouteService';

class ContributionReviewService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ContributionReviewRouteService());
        this.apiClient = apiClient;
    }

    findContributionAchReviews(resource) {
        const url = this.routeService.find(resource);
        return this.apiClient.get(url, resource);
    }

    reviewBatchToProcess(resource){
        const url = this.routeService.reviewBatchToProcess(resource);
        return this.apiClient.put(url, resource)
    }
}

export default ContributionReviewService;

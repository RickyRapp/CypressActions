import { BaseService } from 'core/services';
import FidelityRecommendationCardRouteService from './FidelityRecommendationCardRouteService';

class FidelityRecommendationCardService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new FidelityRecommendationCardRouteService());
        this.apiClient = apiClient;
    }
}

export default FidelityRecommendationCardService;

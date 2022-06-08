import { BaseService } from 'core/services';
import ContributionRouteService from './ContributionRouteService';

class ContributionService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new ContributionRouteService());
        this.apiClient = apiClient;
    }

    getDetails(id, params) {
        const url = this.routeService.getDetails(id, params);
        return this.apiClient.get(url);
    }

    getDonorInformation(id) {
        const url = this.routeService.getDonorInformation(id);
        return this.apiClient.get(url);
    }

    review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }

    findSummary(resource) {
        const url = this.routeService.findSummary(resource);
        return this.apiClient.get(url, resource);
    }
    
    achBatchCurrentNumber(params) {
        const url = this.routeService.achBatchCurrentNumber(params);
        return this.apiClient.get(url);
    }

    generateCsvContributionFile(resource) {
        const url = this.routeService.generateCsvContributionFile(resource);
        return this.apiClient.request({
            method: 'PUT',
            url: url,
            data: resource,
            headers: { Accept: resource.contentType },
            responseType: 'blob',
        });
    }
}

export default ContributionService;

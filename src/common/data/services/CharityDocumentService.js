import { CharityDocumentRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class CharityDocumentService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new CharityDocumentRouteService());
        this.apiClient = apiClient;
    }

    async createBatch(resource) {
        const url = this.routeService.createBatch(resource);
        const response = await this.apiClient.post(url, resource);
        return response || null;
    }
}

export default CharityDocumentService;

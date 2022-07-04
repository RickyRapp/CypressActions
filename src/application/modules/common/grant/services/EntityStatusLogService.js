import { BaseService } from 'core/services';
import EntityStatusLogRouteService from './EntityStatusLogRouteService';

class EntityStatusLogService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new EntityStatusLogRouteService());
        this.apiClient = apiClient;
    }

    findStatus(resources) {
        const url = this.routeService.findStatus(resources);
        return this.apiClient.get(url);
    }
}

export default EntityStatusLogService;

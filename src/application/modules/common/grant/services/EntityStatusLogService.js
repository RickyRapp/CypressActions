import { BaseService } from 'core/services';
import EntityStatusLogRouteService from './EntityStatusLogRouteService';

class EntityStatusLogService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new EntityStatusLogRouteService());
        this.apiClient = apiClient;
    }

    findStatus(resources,type) {
        const url = this.routeService.findStatus(resources,type);
        return this.apiClient.get(url);
    }
}

export default EntityStatusLogService;

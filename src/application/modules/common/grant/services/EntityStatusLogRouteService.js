import { BaseRouteService } from 'core/services';

class EntityStatusLogRouteService extends BaseRouteService {
    constructor() {
        super('entityStatusLogs'); 
     }

    findStatus(resources) {
        return super.get(this.base + `/find-status/{id}`,resources, null);
    }
}

export default EntityStatusLogRouteService;

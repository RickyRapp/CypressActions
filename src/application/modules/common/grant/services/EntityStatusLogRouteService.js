import { BaseRouteService } from 'core/services';

class EntityStatusLogRouteService extends BaseRouteService {
    constructor() {
        super('entityStatusLogs'); 
     }

    findStatus(resources,type) {
        return super.get(this.base + `/find-status/{id}/${type}/`,resources,type, null);
    }
}

export default EntityStatusLogRouteService;

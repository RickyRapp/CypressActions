import { BaseService } from 'core/services';
import FileStreamRouteService from './FileStreamRouteService';

class FileStreamService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new FileStreamRouteService());
        this.apiClient = apiClient;
    }

    get(id) {
        const url = this.routeService.get(id);
        return this.apiClient.get(url);
    }
}

export default FileStreamService;

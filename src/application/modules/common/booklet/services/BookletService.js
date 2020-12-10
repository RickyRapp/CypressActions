import { BaseService } from 'core/services';
import BookletRouteService from './BookletRouteService';

class BookletService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new BookletRouteService());
        this.apiClient = apiClient;
    }

    updateCertificate(resource) {
        const url = this.routeService.updateCertificate(resource);
        return this.apiClient.put(url, resource);
    }
}

export default BookletService;

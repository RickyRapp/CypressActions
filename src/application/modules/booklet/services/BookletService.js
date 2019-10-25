import { BaseService } from 'core/services';
import BookletRouteService from './BookletRouteService';

class BookletService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new BookletRouteService());
        this.apiClient = apiClient;
    }

    async updateCertificate(resource) {
        const url = this.routeService.updateCertificate(resource);
        const response = await this.apiClient.put(url, resource);
        return response || null;
    }
}

export default BookletService;

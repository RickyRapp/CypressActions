import { BaseService } from 'core/services';
import BookletOrderRouteService from './BookletOrderRouteService';

class BookletOrderService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new BookletOrderRouteService());
        this.apiClient = apiClient;
    }

    async review(resource) {
        const url = this.routeService.review(resource);
        const response = await this.apiClient.put(url, resource);
        return response || null;
    }
}

export default BookletOrderService;

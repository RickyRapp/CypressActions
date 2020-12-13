import { BaseService } from 'core/services';
import BookletOrderRouteService from './BookletOrderRouteService';

class BookletOrderService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new BookletOrderRouteService());
        this.apiClient = apiClient;
    }

    review(resource) {
        const url = this.routeService.review(resource);
        return this.apiClient.put(url, resource);
    }

    getDonorInformation(id) {
        const url = this.routeService.getDonorInformation(id);
        return this.apiClient.get(url);
    }
}

export default BookletOrderService;

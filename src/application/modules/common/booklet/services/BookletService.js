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

    export(resource) {
        return this.apiClient.request({
            url: this.routeService.export(resource),
            responseType: 'blob',
            headers: { Accept: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' },
            method: 'GET'
        });
        // const url = this.routeService.export(resource);
        // return this.apiClient.post(url, resource);
    }
}

export default BookletService;

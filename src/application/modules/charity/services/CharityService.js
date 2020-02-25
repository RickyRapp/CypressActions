import { BaseService } from 'core/services';
import CharityRouteService from './CharityRouteService';

class CharityService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new CharityRouteService());
        this.apiClient = apiClient;
    }

    findGrants(filter) {
        const url = this.routeService.findGrants(filter);
        return this.apiClient.get(url);
    }

    findCertificates(filter) {
        const url = this.routeService.findCertificates(filter);
        return this.apiClient.get(url);
    }

    search(filter) {
        const url = this.routeService.search(filter);
        return this.apiClient.get(url);
    }

    taxIdExists(taxId) {
        const url = this.routeService.taxIdExists(taxId);
        return this.apiClient.get(url);
    }

    processUpdateFile(fileId) {
        const url = this.routeService.processUpdateFile(fileId);
        return this.apiClient.get(url);
    }

    createOnlineAccount(resource) {
        const url = this.routeService.createOnlineAccount(resource);
        return this.apiClient.post(url, resource);
    }
}

export default CharityService;

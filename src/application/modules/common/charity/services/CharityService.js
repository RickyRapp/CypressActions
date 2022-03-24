import { BaseService } from 'core/services';
import CharityRouteService from './CharityRouteService';

class CharityService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new CharityRouteService());
        this.apiClient = apiClient;
    }

    getCharityLoginProfile(id) {
        const url = this.routeService.getCharityLoginProfile(id);
        return this.apiClient.get(url);
    }

    findGrants(filter) {
        const url = this.routeService.findGrants(filter);
        return this.apiClient.get(url);
    }

    findCertificates(filter) {
        const url = this.routeService.findCertificates(filter);
        return this.apiClient.get(url);
    }

    suggest(resource) {
        const url = this.routeService.suggest();
        return this.apiClient.post(url, resource);
    }

    search(filter) {
        const url = this.routeService.search(filter);
        return this.apiClient.get(url);
    }

    approve(id) {
        const url = this.routeService.approve(id);
        return this.apiClient.put(url, id);
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

    updateGeneralData(resource) {
        const url = this.routeService.changeUsername(resource);
        return this.apiClient.put(url, resource);
    }

    updateWithPlaid(resource) {
        const url = this.routeService.updateWithPlaid(resource);
        return this.apiClient.put(url, resource);
    }
}

export default CharityService;

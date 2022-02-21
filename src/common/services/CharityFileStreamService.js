import { BaseService } from 'core/services';
import CharityFileStreamRouteService from './CharityFileStreamRouteService';

class CharityFileStreamService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new CharityFileStreamRouteService());
        this.apiClient = apiClient;
    }

    get(id) {
        const url = this.routeService.get(id);
        return this.apiClient.get(url);
    }

    getCharityMedia(charityId, mediaType) {
        const url = this.routeService.getCharityMedia(charityId, mediaType);
        return this.apiClient.get(url);
    }

    uploadCharityBankAccount(file, charityId, bankAccountId) {
        let formData = new FormData();
        formData.append('file', file.getRawFile(), file.name);
        const url = this.routeService.uploadCharityBankAccount(charityId, bankAccountId, file.name);
        return this.apiClient.post(url, formData);
    }

    uploadCharityMedia(file, charityId, mediaType) {
        let formData = new FormData();
        formData.append('file', file.getRawFile(), file.name);
        const url = this.routeService.uploadCharityMedia(charityId, file.name, mediaType);
        return this.apiClient.post(url, formData);
    }
}

export default CharityFileStreamService;

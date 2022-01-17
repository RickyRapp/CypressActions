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

    uploadCharityBankAccount(file, charityId, bankAccountId) { debugger;
        let formData = new FormData();
        formData.append('file', file.getRawFile(), file.name);
        const url = this.routeService.uploadCharityBankAccount(charityId, bankAccountId, file.name);
        return this.apiClient.post(url, formData);
    }
}

export default CharityFileStreamService;

import { BaseService } from 'core/services';
import DonorFileStreamRouteService from './DonorFileStreamRouteService';

class DonorFileStreamService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new DonorFileStreamRouteService());
        this.apiClient = apiClient;
    }

    get(id) {
        const url = this.routeService.get(id);
        return this.apiClient.get(url);
    }

    uploadDonorBankAccount(file, donorId, bankAccountId) {
        let formData = new FormData();
        formData.append('file', file, file.name);
        const url = this.routeService.uploadDonorBankAccount(donorId, bankAccountId, file.name);
        return this.apiClient.post(url, formData);
    }
}

export default DonorFileStreamService;

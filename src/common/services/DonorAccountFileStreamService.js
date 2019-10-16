import { BaseService } from 'core/services';
import DonorAccountFileStreamRouteService from './DonorAccountFileStreamRouteService';

class DonorAccountFileStreamService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new DonorAccountFileStreamRouteService());
        this.apiClient = apiClient;
    }

    get(id) {
        const url = this.routeService.get(id);
        return this.apiClient.get(url);
    }

    uploadDonorAccountBankAccount(file, donorAccountId, bankAccountId) {
        let formData = new FormData();
        formData.append('file', file, file.name);
        const url = this.routeService.uploadDonorAccountBankAccount(donorAccountId, bankAccountId, file.name);
        return this.apiClient.post(url, formData);
    }
}

export default DonorAccountFileStreamService;

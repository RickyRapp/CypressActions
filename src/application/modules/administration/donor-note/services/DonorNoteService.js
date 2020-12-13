import { BaseService } from 'core/services';
import DonorNoteRouteService from './DonorNoteRouteService';

class DonorNoteService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new DonorNoteRouteService());
        this.apiClient = apiClient;
    }
}

export default DonorNoteService;

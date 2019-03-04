import { DonorNoteRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class DonorNoteService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new DonorNoteRouteService());
        this.apiClient = apiClient;
    }
}

export default DonorNoteService;
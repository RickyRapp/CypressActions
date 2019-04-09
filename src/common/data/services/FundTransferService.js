import { FundTransferRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class FundTransferService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new FundTransferRouteService());
        this.apiClient = apiClient;
    }

    async find(id, filter) {
        const url = this.routeService.find(id, filter);
        const response = await this.apiClient.get(url);
        return response.data || null;
    }
}

export default FundTransferService;

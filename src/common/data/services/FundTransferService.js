import { FundTransferRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class FundTransferService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new FundTransferRouteService());
        this.apiClient = apiClient;
    }
}

export default FundTransferService;

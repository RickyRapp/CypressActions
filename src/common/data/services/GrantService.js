import { GrantRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class GrantService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new GrantRouteService());
        this.apiClient = apiClient;
    }
}

export default GrantService;

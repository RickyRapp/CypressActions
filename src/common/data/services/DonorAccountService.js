import { DonorAccountRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class DonorAccountService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorAccountRouteService());
    this.apiClient = apiClient;
  }
}

export default DonorAccountService;

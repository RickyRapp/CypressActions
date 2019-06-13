import { ContributionSettingRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class ContributionSettingService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new ContributionSettingRouteService());
    this.apiClient = apiClient;
  }

}

export default ContributionSettingService;

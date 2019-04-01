import { ContributionSettingRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class ContributionSettingService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new ContributionSettingRouteService());
    this.apiClient = apiClient;
  }

  async createContributionSetting(id, resource) {
    var url = this.routeService.createContributionSetting(id);
    const response = await this.apiClient.post(url, resource);
    return response || null;
  }

  async updateContributionSetting(id, resource) {
    var url = this.routeService.updateContributionSetting(id);
    const response = await this.apiClient.put(url, resource);
    return response || null;
  }
}

export default ContributionSettingService;

import { ContributionRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class ContributionService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new ContributionRouteService());
    this.apiClient = apiClient;
  }

  async createContribution(id, resource) {
    var url = this.routeService.createContribution(id);
    const response = await this.apiClient.post(url, resource);
    return response.data || null;
  }

  async export(resource) {
    var url = this.routeService.export(resource);
    const response = await this.apiClient.get(url, resource);
    return response || null;
  }
}

export default ContributionService;

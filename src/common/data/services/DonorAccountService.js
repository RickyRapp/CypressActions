import { DonorAccountRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class DonorAccountService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorAccountRouteService());
    this.apiClient = apiClient;
  }

  async getSettings(id) {
    const url = this.routeService.getSettings(id);
    const response = await this.apiClient.get(url);
    return response.data || null;
  }

  async updateSettings(resource) {
    const url = this.routeService.updateSettings(resource);
    const response = await this.apiClient.put(url, resource);
    return response || null;
  }

  async search(filter) {
    const url = this.routeService.search(filter);
    const response = await this.apiClient.get(url, filter);
    return response.data || null;
  }
}

export default DonorAccountService;

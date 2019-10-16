import { BaseService } from 'core/services';
import DonorAccountRouteService from './DonorAccountRouteService';

class DonorAccountService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorAccountRouteService());
    this.apiClient = apiClient;
  }

  async updateGeneralData(resource) {
    const url = this.routeService.updateGeneralData(resource);
    const response = await this.apiClient.put(url, resource);
    return response || null;
  }

  async updateAccountSettingsData(resource) {
    const url = this.routeService.updateAccountSettingsData(resource);
    const response = await this.apiClient.put(url, resource);
    return response || null;
  }

  async register(resource) {
    var url = this.routeService.register();
    const response = await this.apiClient.post(url, resource);
    return response || null;
  }

  async getSettings(id) {
    const url = this.routeService.getSettings(id);
    const response = await this.apiClient.get(url);
    return response.data || null;
  }

  async search(filter) {
    const url = this.routeService.search(filter);
    const response = await this.apiClient.get(url, filter);
    return response.data || null;
  }

  async fundNameExists(fundName) {
    const url = this.routeService.fundNameExists(fundName);
    const response = await this.apiClient.get(url);
    return response || null;
  }
}

export default DonorAccountService;

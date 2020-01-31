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

  async createThirdPartyWebsiteSetting(resource) {
    const url = this.routeService.createThirdPartyWebsiteSetting(resource);
    const response = await this.apiClient.post(url, resource);
    return response || null;
  }

  async getThirdPartyWebsiteSetting(id) {
    const url = this.routeService.getThirdPartyWebsiteSetting(id);
    const response = await this.apiClient.get(url);
    return response || null;
  }

  async createAutomaticContributionSetting(resource) {
    const url = this.routeService.createAutomaticContributionSetting(resource);
    const response = await this.apiClient.post(url, resource);
    return response || null;
  }

  async getAutomaticContributionSetting(id) {
    const url = this.routeService.getAutomaticContributionSetting(id);
    const response = await this.apiClient.get(url);
    return response || null;
  }
}

export default DonorAccountService;

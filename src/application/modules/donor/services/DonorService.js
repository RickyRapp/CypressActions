import { BaseService } from 'core/services';
import DonorRouteService from './DonorRouteService';

class DonorService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new DonorRouteService());
    this.apiClient = apiClient;
  }

  updateGeneralData(resource) {
    const url = this.routeService.updateGeneralData(resource);
    return this.apiClient.put(url, resource);
  }

  updateAccountSettingsData(resource) {
    const url = this.routeService.updateAccountSettingsData(resource);
    return this.apiClient.put(url, resource);
  }

  register(resource) {
    var url = this.routeService.register();
    return this.apiClient.post(url, resource);
  }

  getSettings(id) {
    const url = this.routeService.getSettings(id);
    return this.apiClient.get(url);
  }

  search(filter) {
    const url = this.routeService.search(filter);
    return this.apiClient.get(url, filter);
  }

  fundNameExists(fundName) {
    const url = this.routeService.fundNameExists(fundName);
    return this.apiClient.get(url);
  }

  editThirdPartyWebsiteSetting(resource) {
    const url = this.routeService.editThirdPartyWebsiteSetting(resource);
    return this.apiClient.put(url, resource);
  }

  getThirdPartyWebsiteSetting(id) {
    const url = this.routeService.getThirdPartyWebsiteSetting(id);
    return this.apiClient.get(url);
  }

  getAutomaticContributionSetting(id) {
    const url = this.routeService.getAutomaticContributionSetting(id);
    return this.apiClient.get(url);
  }

  createAutomaticContributionSetting(resource) {
    const url = this.routeService.createAutomaticContributionSetting(resource);
    return this.apiClient.post(url, resource);
  }

  getCertificateSetting(id) {
    const url = this.routeService.getCertificateSetting(id);
    return this.apiClient.get(url);
  }

  editCertificateSetting(resource) {
    const url = this.routeService.editCertificateSetting(resource);
    return this.apiClient.put(url, resource);
  }
}

export default DonorService;

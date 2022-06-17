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

  updateAccountSetting(resource) {
    const url = this.routeService.updateAccountSetting(resource);
    return this.apiClient.put(url, resource);
  }

  updateGrantFees(resource) {
    const url = this.routeService.updateGrantFees(resource);
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

  searchAccountManager(filter) {
    const url = this.routeService.searchAccountManager(filter);
    return this.apiClient.get(url, filter);
  }

  fundNameExists(fundName) {
    const url = this.routeService.fundNameExists(fundName);
    return this.apiClient.get(url);
  }

  phoneNumberExists(phoneNumber) {
    const url = this.routeService.phoneNumberExists(phoneNumber);
    return this.apiClient.get(url);
  }

  updateThirdPartyWebsiteSetting(resource) {
    const url = this.routeService.updateThirdPartyWebsiteSetting(resource);
    return this.apiClient.put(url, resource);
  }
  updateOnlineGrantSetting(resource) {
    const url = this.routeService.updateOnlineGrantSetting(resource);
    console.log(resource);
    console.log(url);
    return this.apiClient.put(url, resource);
  }

  updateCertificateSetting(resource) {
    const url = this.routeService.editCertificateSetting(resource);
    return this.apiClient.put(url, resource);
  }

  getThirdPartyWebsiteSetting(id) {
    const url = this.routeService.getThirdPartyWebsiteSetting(id);
    return this.apiClient.get(url);
  }
  getOnlineGrantSetting(id) {
    const url = this.routeService.getOnlineGrantSetting(id);
    return this.apiClient.get(url);
  }
  getDonorLoginProfile(id) {
    const url = this.routeService.getDonorLoginProfile(id);
    return this.apiClient.get(url);
  }

  getDonor(id, options) {
    const url = this.routeService.get(id, options);
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

  loadDashboardData(id) {
    const url = this.routeService.loadDashboardData(id);
    return this.apiClient.get(url);
  }

  searchDonor(filter) {
    const url = this.routeService.findByUsernameOrAccNumber(filter);
    return this.apiClient.get(url, filter);
  }
}

export default DonorService;

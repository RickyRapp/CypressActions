import { BaseRouteService } from 'core/services';

class DonorRouteService extends BaseRouteService {
  constructor() {
    super('donor');
  }

  find(filter) {
    return super.find(this.base + '/{?search,firstName,lastName,emails,accountNumber,accountTypeId,page,rpp,sort,embed,fields,pin,phone,address}', filter);
  }

  findByUsernameOrAccNumber(filter) {
    return super.find(this.base + '/find-donor/{?userName,fundName,search,firstName,lastName,emails,accountNumber,accountTypeId,page,rpp,sort,embed,fields,pin,phone,address}', filter);
  }

  get(id, options) {
    return super.get(this.base + '/{id}/{?embed,fields}', id, options);
  }

  getSettings(id) {
    return super.get(this.base + '/settings/' + '{id}', id);
  }

  getDonorLoginProfile(id) {
    return super.get(this.base + '/login-donor-data/' + '{id}', id);
  }

  create() {
    return super.create(this.base);
  }

  register() {
    return super.create(this.base + '/register');
  }

  update(resource) {
    return super.update(this.base + '/{id}', resource);
  }

  updateGeneralData(resource) {
    return super.update(this.base + '/{id}/general-data', resource);
  }

  updateAccountSetting(resource) {
    return super.update(this.base + '/{id}/account-setting', resource);
  }

  updateGrantFees(resource) {
    return super.update(this.base + '/{id}/grant-fees', resource);
  }

  delete(resource) {
    return super.delete(this.base + '/{id}', resource);
  }

  search(filter) {
    return super.find(this.base + '/search/{?id,search,page,rpp,sort,embed,fields,exceptId}', filter);
  }

  searchAccountManager(filter) {
    return super.find(this.base + '/search-account-manager/{?id,search,page,rpp,sort,embed,fields,exceptId}', filter);
  }

  fundNameExists(fundName) {
    return super.get(this.base + '/fund-name/{fundName}/exists/', null, { fundName: btoa(fundName) });
  }

  phoneNumberExists(phoneNumber) {
    return super.get(this.base + '/phone-number/{phoneNumber}/exists/', null, { phoneNumber: phoneNumber });
  }

  getThirdPartyWebsiteSetting(id) {
    return super.get('third-party-website-setting/{id}', id);
  }
  getOnlineGrantSetting(id) {
    return super.get('donor-online-grant-setings/{id}', id);
  }
  updateThirdPartyWebsiteSetting(resource) {
    return super.update('third-party-website-setting/{id}', resource);
  }
  updateOnlineGrantSetting(resource) {
    console.log(resource);
    return super.update('donor-online-grant-setings/{id}', resource);
  }
  getAutomaticContributionSetting(id) {
    return super.get('automatic-contribution-setting/{id}', id);
  }

  createAutomaticContributionSetting(resource) {
    return super.create('automatic-contribution-setting', resource);
  }

  getCertificateSetting(id) {
    return super.get('certificate-setting/{id}', id);
  }

  editCertificateSetting(resource) {
    return super.update('certificate-setting/{id}', resource);
  }

  loadDashboardData(id) {
    return super.get(this.base + '/load-donor-data/{id}', id);
  }
}

export default DonorRouteService;

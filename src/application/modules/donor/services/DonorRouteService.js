import { BaseRouteService } from 'core/services';

class DonorRouteService extends BaseRouteService {
  constructor() {
    super('donor');
  }

  find(filter) {
    return super.find(this.base + '/{?search,firstName,lastName,emails,accountNumber,accountTypeId,page,rpp,sort,embed,fields}', filter);
  }

  get(id, options) {
    return super.get(this.base + '/{id}/{?embed,fields}', id, options);
  }

  getSettings(id) {
    return super.get(this.base + '/settings/' + '{id}', id);
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

  updateAccountSettingsData(resource) {
    return super.update(this.base + '/{id}/account-settings', resource);
  }

  delete(resource) {
    return super.delete(this.base + '/{id}', resource);
  }

  search(filter) {
    return super.find(this.base + '/search/{?id,search,page,rpp,sort,embed,fields,exceptId}', filter);
  }

  fundNameExists(fundName) {
    return super.get(this.base + '/fund-name/{fundName}/exists/', null, { fundName: fundName });
  }

  getThirdPartyWebsiteSetting(id) {
    return super.get('third-party-website-setting/{id}', id);
  }

  editThirdPartyWebsiteSetting(resource) {
    return super.update('third-party-website-setting/{id}', resource);
  }

  getAutomaticContributionSetting(id) {
    return super.get('donor-contribution-setting/{id}', id);
  }

  createAutomaticContributionSetting(resource) {
    return super.create('donor-contribution-setting', resource);
  }

  getCertificateSetting(id) {
    return super.get('certificate-setting/{id}', id);
  }

  editCertificateSetting(resource) {
    return super.update('certificate-setting/{id}', resource);
  }

  loadDonorData(id) {
    return super.get(this.base + '/load-donor-data/{id}', id);
  }
}

export default DonorRouteService;

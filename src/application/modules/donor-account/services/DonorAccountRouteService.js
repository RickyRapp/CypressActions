import { BaseRouteService } from 'core/services';

class DonorAccountRouteService extends BaseRouteService {
  constructor() {
    super('donor-account');
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
    return super.get('third-party-website-setting', id);
  }

  getThirdPartyWebsiteSetting(id) {
    return super.get('third-party-website-setting/{id}', id);
  }

  createThirdPartyWebsiteSetting(resource) {
    return super.create('third-party-website-setting', resource);
  }
}

export default DonorAccountRouteService;

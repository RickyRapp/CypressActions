import { CharityRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class CharityService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new CharityRouteService());
    this.apiClient = apiClient;
  }

  async export(filter) {
    var url = this.routeService.export(filter);
    const response = await this.apiClient.get(url, filter);
    return response.data || null;
  }

  async review(resource) {
    const url = this.routeService.review(resource);
    const response = await this.apiClient.put(url, resource);
    return response || null;
  }

  async findDocuments(filter) {
    const url = this.routeService.findDocuments(filter);
    const response = await this.apiClient.get(url);
    return response.data || null;
  }

  async search(filter) {
    const url = this.routeService.search(filter);
    const response = await this.apiClient.get(url, filter);
    return response.data || null;
  }

  async donation(filter) {
    const url = this.routeService.donation(filter);
    const response = await this.apiClient.get(url);
    return response.data || null;
  }


}

export default CharityService;

import { CharityRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class CharityService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new CharityRouteService());
    this.apiClient = apiClient;
  }

  // async create(resource) {
  //   var url = this.routeService.create();
  //   const response = await this.apiClient.post(url, resource);
  //   return response || null;
  // }

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
}

export default CharityService;

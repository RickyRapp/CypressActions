import { BookletOrderRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class BookletOrderService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new BookletOrderRouteService());
    this.apiClient = apiClient;
  }

  async review(resource) {
    const url = this.routeService.review(resource);
    const response = await this.apiClient.post(url, resource);
    return response || null;
  }
}

export default BookletOrderService;

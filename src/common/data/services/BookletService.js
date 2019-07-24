import { BookletRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class BookletService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new BookletRouteService());
    this.apiClient = apiClient;
  }

  async inventory() {
    const url = this.routeService.inventory();
    const response = await this.apiClient.get(url);
    return response.data || null;
  }
}

export default BookletService;

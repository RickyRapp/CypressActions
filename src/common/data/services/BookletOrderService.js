import { BookletOrderRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class BookletOrderService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new BookletOrderRouteService());
    this.apiClient = apiClient;
  }
}

export default BookletOrderService;

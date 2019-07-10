import { BookletRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class BookletService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new BookletRouteService());
    this.apiClient = apiClient;
  }
}

export default BookletService;

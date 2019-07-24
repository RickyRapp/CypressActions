import { CertificateRouteService } from 'common/data';
import { BaseService } from 'core/services';
import _ from 'lodash';

class CertificateService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new CertificateRouteService());
    this.apiClient = apiClient;
  }

  async update(resource) {
    const url = this.routeService.update(resource);
    const response = await this.apiClient.post(url, resource);
    return response || null;
  }
}

export default CertificateService;

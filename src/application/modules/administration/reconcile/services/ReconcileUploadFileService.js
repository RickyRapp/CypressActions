import { BaseService } from 'core/services';
import ReconcileUploadFileRouteService from './ReconcileUploadFileRouteService';

class ReconcileUploadFileService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new ReconcileUploadFileRouteService());
    this.apiClient = apiClient;
  }
}

export default ReconcileUploadFileService;

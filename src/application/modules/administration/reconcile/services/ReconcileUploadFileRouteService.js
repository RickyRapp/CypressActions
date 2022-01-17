import { BaseRouteService } from 'core/services';

class ReconcileUploadFileRouteService extends BaseRouteService {
  constructor() {
    super('reconcile');
  }

  uploadFile(resource) {
    return super.update(this.base+'/checks-upload', resource);
  }
}

export default ReconcileUploadFileRouteService;
import { BaseRouteService } from 'core/services';

class FileStreamRouteService extends BaseRouteService {
    constructor() {
        super('file-streams');
    }

    getPreview(id, options) {
        return super.get(ApplicationSettings.useSSL ? 'https://' : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" + this.base + '/{id}/{?embed}', id, options); // eslint-disable-line
    }
}

export default FileStreamRouteService;

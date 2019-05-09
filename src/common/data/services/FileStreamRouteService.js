import { BaseRouteService } from 'core/services';
import { apiUrl, http } from 'core/utils';

class FileStreamRouteService extends BaseRouteService {
    constructor() {
        super();
        this.rootBase = 'file-streams/';
        this.base = `tdf-${this.rootBase}/`;
        this.apiUrl = apiUrl;
        this.http = http;
    }

    get(id, options) {
        return super.get(this.rootBase + '{id}/{?embed}', id, options);
    }

    get(id, options) {
        return super.get(this.rootBase + '{id}/{?embed}', id, options);
    }

    getPreview(id, options) {
        return super.get(this.http + this.apiUrl + this.rootBase + '{id}/{?embed}', id, options);
    }
}

export default FileStreamRouteService;

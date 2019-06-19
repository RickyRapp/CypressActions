import { BaseRouteService } from 'core/services';
import { apiUrl, http } from 'core/utils';

class FileStreamRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'file-streams/';
        this.tdfBase = `tdf-${this.rootBase}/`;
        this.mediaVaultBase = 'media-vaults/';
        this.apiUrl = apiUrl;
        this.http = http;
    }

    get(id, options) {
        return super.get(this.rootBase + '{id}/{?embed}', id, options);
    }

    getPreview(id, options) {
        return super.get(this.http + this.apiUrl + this.base + '{id}/{?embed}', id, options);
    }

    getDownloadLink(id) {
        return super.get(this.http + this.apiUrl + this.tdfBase + '{id}', id);
    }

    delete(id) {
        return this.mediaVaultBase + id;
    }

    deleteBatch() {
        return this.mediaVaultBase + 'batch';
    }
}

export default FileStreamRouteService;

import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { getParams } from 'core/utils';

class DonorNoteRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'donor-note/';
        this.uriTemplateService = uritemplate;
    }

    find(filter) {
        return super.find(this.base + '{?id,page,rpp,sort,embed,fields,searchFields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '{id}/{?embed}', id, options);
    }

    update(resource) {
        return super.update(this.base + '{id}', resource);
    }

    create() {
        return super.create(this.base);
    }

    delete(resource) {
        return super.delete(this.base + '{id}', resource);
    }
}

export default DonorNoteRouteService;

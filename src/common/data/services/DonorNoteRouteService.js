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
}

export default DonorNoteRouteService;

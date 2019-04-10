import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { findParams } from 'core/utils';

class ActivityAndHistoryRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'activity-and-history/';
        this.uriTemplateService = uritemplate;
    }

    find(id, filter) {
        const params = findParams({ id: id, ...filter });
        return this.uriTemplateService.parse(this.base + '{id}/{?page,rpp,sort,embed,fields,searchFields}').expand(params);
    }
}

export default ActivityAndHistoryRouteService;

import { BaseRouteService } from 'core/services';

class ApplicationDefaultSettingRouteService extends BaseRouteService {
    constructor() {
        super('application-default-setting');
    }

    find(filter) {
        return super.find(this.base + '/{?searchQuery,page,rpp,sort,embed,fields,abrv,isActive}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }
}

export default ApplicationDefaultSettingRouteService;

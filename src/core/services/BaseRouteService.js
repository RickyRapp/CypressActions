import * as uritemplate from 'uritemplate';
import { findParams, getParams } from 'core/utils';

class BaseRouteService {
    constructor(base) {
        if(!base) {
            throw new Error('Property \'base\' in BaseRouteService is missing');
        }
        this.base = base;

        this.uriTemplateService = uritemplate;
    }

    find(route, options) {
        const params = findParams(options);
        return this.uriTemplateService.parse(route).expand(params);
    }

    get(route, id, options) {
        const params = getParams({ id: id, ...options });
        return this.uriTemplateService.parse(route).expand(params);
    }

    create(route, resource = {}) {
        return this.uriTemplateService.parse(route).expand(resource);
    }

    update(route, resource) {
        return this.uriTemplateService.parse(route).expand(resource);
    }

    delete(route, resource) {
        return this.uriTemplateService.parse(route).expand(resource);
    }

    batchDelete(route) {
        return this.uriTemplateService.parse(route).expand({});
    }

    batchUpdate(route, resources) {
        return this.uriTemplateService.parse(route).expand(resources);
    }

    batchCreate(route, resources) {
        return this.uriTemplateService.parse(route).expand(resources);
    }
}

export default BaseRouteService;

import * as uritemplate from 'uritemplate';
import { findParams, getParams } from 'core/utils';

class BaseRouteService {
    constructor() {
        this.uriTemplateService = uritemplate;
    }

    find(route, options) {
        const params = findParams(options);
        return this.uriTemplateService.parse(route).expand(params);
    }

    get(route, id, options) {
        const params = getParams({ id: id, ...options })
        return this.uriTemplateService.parse(route).expand(params);
    }

    create(route) {
        return this.uriTemplateService.parse(route).expand({});
    }

    update(route, resource) {
        return this.uriTemplateService.parse(route).expand(resource);
    }

    delete(route, resource) {
        return this.uriTemplateService.parse(route).expand(resource);
    }
}

export default BaseRouteService;
import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { findParams } from 'core/utils';

class CharityDocumentRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'charity-document/';
        this.uriTemplateService = uritemplate;
    }

    find(filter) {
        return super.find(this.base + '{?charityId,page,rpp,sort,embed,searchFields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '{id}/{?embed}', id, options);
    }

    create(resource) {
        return super.create(this.base, resource);
    }

    createBatch(resource) {
        return super.create(this.base + 'batch', resource);
    }

    update() {
        return this.base;
    }
}

export default CharityDocumentRouteService;

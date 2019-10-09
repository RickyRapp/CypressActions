import _ from 'lodash';

class BaseService {
    apiClient = null;

    constructor(apiClient, routeService) {
        this.apiClient = apiClient;
        this.routeService = routeService;

        this.find = this.find.bind(this);
        this.get = this.get.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
        this.batchDelete = this.batchDelete.bind(this);
        this.batchUpdate = this.batchUpdate.bind(this);
    }

    find(filter) {
        const url = this.routeService.find(filter);
        return this.apiClient.get(url);
    }

    get(id, options = { }) {
        const url = this.routeService.get(id, options);
        return this.apiClient.get(url);
    }

    create(resource) {
        const url = this.routeService.create();
        return this.apiClient.post(url, resource);
    }

    update(resource) {
        const url = this.routeService.update(resource);
        return this.apiClient.put(url, resource);
    }

    delete(resource) {
        const url = this.routeService.delete(resource);
        return this.apiClient.delete(url, null, resource);
    }

    batchDelete(resources) {
        const url = this.routeService.batchDelete(resources);
        const ids = resources ? _.map(resources, (r) => r.id) : [];
        return this.apiClient.delete(url, null, ids);
    }

    batchUpdate(resources) {
        const url = this.routeService.batchUpdate(resources);
        return this.apiClient.put(url, resources)
    }

    batchCreate(resources) {
        const url = this.routeService.batchCreate(resources);
        return this.apiClient.post(url, resources)
    }
}

export default BaseService;

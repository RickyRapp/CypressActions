class BaseService {
  apiClient = null;
  routeService = null;

  constructor(apiClient, routeService) {
    this.apiClient = apiClient;
    this.routeService = routeService;

    this.find = this.find.bind(this);
    this.get = this.get.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async find(filter) {
    const url = this.routeService.find(filter);
    const response = await this.apiClient.get(url);
    return response.data || null;
  }

  async get(id, options = {}) {
    const url = this.routeService.get(id, options);
    const response = await this.apiClient.get(url);
    return response.data || null;
  }

  async create(resource) {
    var url = this.routeService.create();
    const response = await this.apiClient.post(url, resource);
    return response.data || null;
  }

  async update(resource) {
    const url = this.routeService.update(resource);
    const resposne = await this.apiClient.put(url, resource);
    return response.data || null;
  }

  async delete(resource) {
    const url = this.routeService.delete(resource);
    const response = await this.apiClient.delete(url, resource);
    return response.data || null;
  }
}

export default BaseService;

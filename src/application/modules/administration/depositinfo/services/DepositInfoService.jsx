import { BaseService } from "core/services";
import { DepositInfoRouteService } from "application/administration/depositinfo/services";

class DepositInfoService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new DepositInfoRouteService());
		this.apiClient = apiClient;
	}
	generateReport(resource) {
        const url = this.routeService.update(resource);
        return this.apiClient.request({
            method: 'PUT',
            url: url,
            data: resource,
            headers: { Accept: resource.contentType },
            responseType: 'blob',
        });
    }
    getIds() {
        const url = this.routeService.getIds();
        return this.apiClient.get(url);
    }
}

export default DepositInfoService;
import { BaseService } from "core/services";
import { DepositInfoRouteService } from "application/donor/depositinfo/services";

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
}

export default DepositInfoService;
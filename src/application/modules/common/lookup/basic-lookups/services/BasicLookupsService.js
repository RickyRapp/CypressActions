import { BaseService } from 'core/services';
import { BasicLookupsRouteService } from 'application/common/lookup/basic-lookups/services';

class BasicLookupsService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new BasicLookupsRouteService());
		this.apiClient = apiClient;
	}
	async invalidate(){
		const url = this.routeService.invalidate();
        return await this.apiClient.get(url);
	}
}

export default BasicLookupsService;

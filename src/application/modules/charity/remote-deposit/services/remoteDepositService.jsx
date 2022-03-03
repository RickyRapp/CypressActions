import { BaseService } from "core/services";
import { remoteDepositRouteService } from "application/charity/remote-deposit/services";

class remoteDepositService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new remoteDepositRouteService());
	}
}

export default remoteDepositService;
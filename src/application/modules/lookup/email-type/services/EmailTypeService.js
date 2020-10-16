import { BaseService } from 'core/services';
import { EmailTypeRouteService } from 'application/lookup/email-type/services';

class EmailTypeService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new EmailTypeRouteService());
	}
}

export default EmailTypeService;

import { BaseService } from 'core/services';
import { EmailSenderRouteService } from 'application/common/lookup/email-sender/services';

class EmailSenderService extends BaseService {
	constructor(apiClient) {
		super(apiClient, new EmailSenderRouteService());
	}
}

export default EmailSenderService;

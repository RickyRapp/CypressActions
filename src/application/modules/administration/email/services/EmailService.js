import { BaseService } from 'core/services';
import EmailRouteService from './EmailRouteService';

class EmailService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new EmailRouteService());
        this.apiClient = apiClient;
    }
}

export default EmailService;

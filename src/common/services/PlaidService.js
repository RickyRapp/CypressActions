import { BaseService } from 'core/services';

class PlaidService extends BaseService {
    constructor(apiClient) {
        super(apiClient, null);
        this.apiClient = apiClient;
    }

    getLinkToken() {
        const url = 'http://api.thedonorsfund.local/thedonorsfund/plaid/token';
        return this.apiClient.get(url);
    }

    validateAccount(public_token, accountId) {
        const url = 'http://api.thedonorsfund.local/thedonorsfund/plaid/validate';
        return this.apiClient.post(url, { token: public_token, accountId });
    }
}

export default PlaidService;

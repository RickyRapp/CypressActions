import { BaseService } from 'core/services';

class PlaidService extends BaseService {
    constructor(apiClient) {
        super(apiClient, null);
        this.apiClient = apiClient;
    }

    getLinkToken() {
        const url = 'plaid/token';
        return this.apiClient.get(url);
    }

    validateAccount(public_token, accountId) {
        const url = 'plaid/validate';
        return this.apiClient.post(url, { token: public_token, accountId });
    }
}

export default PlaidService;

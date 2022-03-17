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

    exchangeToken(public_token) {
        const url = 'http://api.thedonorsfund.local/thedonorsfund/plaid/exchange';
        return this.apiClient.post(url, public_token);
    }
}

export default PlaidService;

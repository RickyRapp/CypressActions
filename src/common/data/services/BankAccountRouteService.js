import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { findParams } from 'core/utils';

class BankAccountRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'bank-account/';
        this.uriTemplateService = uritemplate;
    }

    get(id, options) {
        return super.get(this.base + '{id}/{?embed}', id, options);
    }

    getDonorAccountCollection(id, options) {
        const params = findParams({ id: id, ...options });
        return this.uriTemplateService.parse(this.base + 'donor-account/{id}/{?embed,sort}').expand(params);
    }

    createDonorAccountCollection(id) {
        return this.uriTemplateService.parse(this.base + 'donor-account/{id}').expand(id);
    }

    update() {
        return this.base;
    }

    updateDonorAccountBankAccounts(resource) {
        return super.update(this.base + 'donor-account-bank-accounts/{id}', resource);
    }
}

export default BankAccountRouteService;

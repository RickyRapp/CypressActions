import { BaseRouteService } from 'core/services';
import * as uritemplate from 'uritemplate';
import { findParams } from 'core/utils';

class BankAccountRouteService extends BaseRouteService {
    constructor() {
        super();
        this.base = 'bank-account/';
        this.uriTemplateService = uritemplate;
    }

    find(filter) {
        return super.find(this.base + '{?donorAccountId,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '{id}/{?embed}', id, options);
    }

    createBankAccount(userId) {
        return this.uriTemplateService.parse(this.base + 'donor-account/{userId}').expand({ userId: userId });
    }

    update() {
        return this.base;
    }
}

export default BankAccountRouteService;

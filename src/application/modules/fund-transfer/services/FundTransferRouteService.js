import { BaseRouteService } from 'core/services';

class FundTransferRouteService extends BaseRouteService {
    constructor() {
        super('fund-transfer');
    }

    find(filter) {
        return super.find(this.base + '/{?donorAccountId,amountRangeMin,amountRangeMax,senderDonorAccountId,recipientDonorAccountId,dateCreatedStartDate,dateCreatedEndDate,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    create() {
        return super.create(this.base);
    }
}

export default FundTransferRouteService;

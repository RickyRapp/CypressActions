import { BaseRouteService } from 'core/services';

class FeeRouteService extends BaseRouteService {
  constructor() {
    super();
    this.base = 'fee/';
    this.queryParams = 'nameOrTaxId,address,emails,charityStatusIds,charityTypeIds,dateCreatedStartDate,dateCreatedEndDate,page,rpp,sort,embed,searchFields';
  }

  find(filter) {
    return super.find(this.base + `{?${this.queryParams}}`, filter);
  }

  findDocuments(filter) {
    return super.find(this.base + `documents/{?id,page,rpp,sort,embed,searchFields}`, filter);
  }

  get(id, options) {
    return super.get(this.base + '{id}/{?embed}', id, options);
  }

  calculateFee(options) {
    return super.find(this.base + 'calculate-fee/{?id,feeTypeId,amount}', options);
  }
}

export default FeeRouteService;

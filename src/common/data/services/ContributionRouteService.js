import { BaseRouteService } from 'core/services';
import { getParams } from 'core/utils';

class ContributionRouteService extends BaseRouteService {
  constructor() {
    super();
    this.base = 'contribution/';
  }

  find(filter) {
    return super.find(this.base + '{?confirmationNumber,amountRangeMin,amountRangeMax,donorAccountId,dateCreatedStartDate,dateCreatedEndDate,paymentTypeIds,contributionStatusIds,page,rpp,sort,embed,searchFields}', filter);
  }

  get(id, options) {
    return super.get(this.base + '{id}/{?embed}', id, options);
  }

  createContribution(id) {
    const params = getParams({ id: id });
    return this.uriTemplateService.parse(this.base + '{id}').expand(params)
  }

  update(resource) {
    return super.update(this.base + '{id}', resource);
  }
}

export default ContributionRouteService;

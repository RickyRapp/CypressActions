import { BaseRouteService } from 'core/services';
import { getParams } from 'core/utils';

class ContributionRouteService extends BaseRouteService {
  constructor() {
    super();
    this.base = 'contribution/';
  }

  find(id, filter) {
    let url = this.base;
    if (id) {
      const params = getParams({ id: id });
      url = this.uriTemplateService.parse(this.base + 'list/{id}/').expand(params);
    }
    else {
      url = this.base + 'list/';
    }
    return super.find(url + '{?confirmationNumber,amountRangeMin,amountRangeMax,donorAccountIds,dateCreatedStartDate,dateCreatedEndDate,paymentTypeIds,contributionStatusIds,page,rpp,sort,embed,searchFields}', filter);
  }

  get(id, options) {
    return super.get(this.base + '{id}/{?embed}', id, options);
  }

  createContribution(id) {
    const params = getParams({ id: id });
    return this.uriTemplateService.parse(this.base + '{id}').expand(params)
  }

  export(filter) {
    return super.find(this.base + 'search-export/{?exportFields,exportLimit,confirmationNumber,amountRangeMin,amountRangeMax,donorAccountId,dateCreatedStartDate,dateCreatedEndDate,paymentTypeIds,contributionStatusIds,page,rpp,sort,embed,searchFields}', filter);
  }

  update(resource) {
    return super.update(this.base + '{id}', resource);
  }
}

export default ContributionRouteService;

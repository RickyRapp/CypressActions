import { BaseRouteService } from 'core/services';
import { getParams } from 'core/utils';

class ContributionRouteService extends BaseRouteService {
  constructor() {
    super();
    this.base = 'contribution/';
    this.queryParams = 'confirmationNumber,amountRangeMin,amountRangeMax,donorAccountId,dateCreatedStartDate,dateCreatedEndDate,paymentTypeIds,contributionStatusIds,page,rpp,sort,embed,searchFields';
  }

  find(id, filter) {
    let url = this.base + 'list/';
    if (id) {
      const params = getParams({ id: id });
      url = this.uriTemplateService.parse(url + '{id}/').expand(params);
    }
    return super.find(url + `{?${this.queryParams}}`, filter);
  }

  get(id, options) {
    return super.get(this.base + '{id}/{?embed}', id, options);
  }

  createContribution(id) {
    const params = getParams({ id: id });
    return this.uriTemplateService.parse(this.base + '{id}').expand(params)
  }

  export(filter) {
    return super.find(this.base + `search-export/{?exportFields,exportLimit,${this.queryParams}}`, filter);
  }

  update(resource) {
    return super.update(this.base + '{id}', resource);
  }
}

export default ContributionRouteService;

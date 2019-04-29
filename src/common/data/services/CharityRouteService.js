import { BaseRouteService } from 'core/services';

class CharityRouteService extends BaseRouteService {
  constructor() {
    super();
    this.base = 'charity/';
    this.queryParams = 'nameOrTaxId,address,emails,charityStatusIds,charityTypeIds,dateCreatedStartDate,dateCreatedEndDate,page,rpp,sort,embed,searchFields';
  }

  find(filter) {
    return super.find(this.base + `{?${this.queryParams}}`, filter);
  }

  get(id, options) {
    return super.get(this.base + '{id}/{?embed}', id, options);
  }

  create() {
    return super.create(this.base);
  }

  export(filter) {
    return super.find(this.base + `search-export/{?exportFields,exportLimit,${this.queryParams}}`, filter);
  }

  update(resource) {
    return super.update(this.base + '{id}', resource);
  }

  review(resource) {
    return this.uriTemplateService.parse(this.base + 'review/{id}').expand(resource);
  }
}

export default CharityRouteService;

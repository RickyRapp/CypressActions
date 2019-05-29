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

  donation(filter) {
    return super.find(this.base + 'donation/{?charityId,done,dateCreatedStartDate,dateCreatedEndDate,amountRangeMin,amountRangeMax,page,rpp,sort,embed,searchFields}', filter);
  }

  findDocuments(filter) {
    return super.find(this.base + 'documents/{?id,page,rpp,sort,embed,searchFields}', filter);
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

  search(filter) {
    return super.find(this.base + 'search/{?id,searchQuery,page,rpp,sort,embed,fields,exceptId}', filter);
  }
}

export default CharityRouteService;

import { BaseRouteService } from 'core/services';

class BookletOrderRouteService extends BaseRouteService {
  constructor() {
    super();
    this.base = 'booklet-order/';
    this.queryParams = 'donorAccountId,confirmationNumber,amountRangeMin,amountRangeMax,dateCreatedStartDate,dateCreatedEndDate,bookletOrderStatusIds,deliveryMethodTypeIds,page,rpp,sort,embed,fields';
  }

  find(filter) {
    return super.find(this.base + `{?${this.queryParams}}`, filter);
  }

  get(id, options) {
    return super.get(this.base + '{id}/{?embed,fields}', id, options);
  }

  create() {
    return super.create(this.base);
  }

  update(resource) {
    return super.update(this.base + '{id}', resource);
  }

  review(resource) {
    return this.uriTemplateService.parse(this.base + 'review').expand(resource);
  }
}

export default BookletOrderRouteService;

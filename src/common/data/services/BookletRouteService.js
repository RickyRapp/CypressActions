import { BaseRouteService } from 'core/services';

class BookletRouteService extends BaseRouteService {
  constructor() {
    super();
    this.base = 'booklet/';
    this.queryParams = 'donorAccountId,bookletStatusIds,denominationTypeIds,codes,certificateBarcodes,dateCreatedStartDate,dateCreatedEndDate,page,rpp,sort,embed,fields';
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
    return this.uriTemplateService.parse(this.base + 'review/{id}').expand(resource);
  }
}

export default BookletRouteService;

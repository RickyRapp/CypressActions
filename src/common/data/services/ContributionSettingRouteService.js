import { BaseRouteService } from 'core/services';
import { getParams } from 'core/utils';

class ContributionSettingRouteService extends BaseRouteService {
  constructor() {
    super();
    this.base = 'contribution-setting/';
  }

  find(filter) {
    return super.find(this.base + '{?donorAccountId,page,rpp,sort,embed,fields,searchFields}', filter);
  }

  get(id, options) {
    return super.get(this.base + '{id}/{?embed}', id, options);
  }

  createContributionSetting(id) {
    const params = getParams({ id: id });
    return this.uriTemplateService.parse(this.base + '{id}/').expand(params);
  }

  updateContributionSetting(id) {
    const params = getParams({ id: id });
    return this.uriTemplateService.parse(this.base + '{id}/').expand(params);
  }

  update(resource) {
    return super.update(this.base + '{id}', resource);
  }

  delete(resource) {
    return super.delete(this.base + '{id}', resource);
  }
}

export default ContributionSettingRouteService;

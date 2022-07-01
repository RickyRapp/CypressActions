import { BaseService } from 'core/services';
import WithdrawSettingsRouteService from './WithdrawSettingsRouteService';

class WithdrawSettingsService extends BaseService {
  constructor(apiClient) {
    super(apiClient, new WithdrawSettingsRouteService());
    this.apiClient = apiClient;
  }

  getbyParty(partyId) {
    const url = this.routeService.getbyParty(partyId);
    return this.apiClient.get(url);
}
}

export default WithdrawSettingsService;

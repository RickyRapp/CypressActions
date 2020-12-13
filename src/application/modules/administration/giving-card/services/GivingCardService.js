import { BaseService } from 'core/services';
import GivingCardRouteService from './GivingCardRouteService';

class GivingCardService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new GivingCardRouteService());
        this.apiClient = apiClient;
    }
}

export default GivingCardService;

import { BaseRouteService } from 'core/services';

class ScannerConnectionRouteService extends BaseRouteService {
    constructor() {
        super('scanner-connection');
    }

    find(filter) {
        return super.find(this.base + '/{?isActive,coreUserId,search,page,rpp,sort,embed,fields}', filter);
    }
}

export default ScannerConnectionRouteService;

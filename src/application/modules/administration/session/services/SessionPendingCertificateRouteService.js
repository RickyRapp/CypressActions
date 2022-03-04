import { BaseRouteService } from 'core/services';

class SessionPendingCertificateRouteService extends BaseRouteService {
    constructor() {
        super('session-pending-certificate');
    }

    find(filter) {
        return super.find(this.base + '/{?sessionPendingCertificateStatusIds,search,page,rpp,sort,embed,fields}', filter);
    }

    findByCharity(filter) {
        return super.find(this.base + '/{?sessionPendingCertificateStatusIds,search,page,rpp,sort,embed,fields}', filter);
    }
}

export default SessionPendingCertificateRouteService;

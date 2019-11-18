import { BaseRouteService } from 'core/services';

class SessionCertificateRouteService extends BaseRouteService {
    constructor() {
        super('session-certificate');
    }

    find(filter) {
        return super.find(this.base + '/{?search,bookletCertificateCode,dateCreatedFrom,dateCreatedTo,charityId,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }
}

export default SessionCertificateRouteService;

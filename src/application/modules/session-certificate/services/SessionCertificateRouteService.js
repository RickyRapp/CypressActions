import { BaseRouteService } from 'core/services';

class SessionCertificateRouteService extends BaseRouteService {
    constructor() {
        super('session-certificate');
    }

    find(filter) {
        return super.find(this.base + '/{?search,bookletCertificateCode,dateCreatedFrom,dateCreatedTo,donorAccountId,charityId,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    reviewToken(reviewToken) {
        return super.get(this.base + '/review-token/{id}', reviewToken);
    }
}

export default SessionCertificateRouteService;

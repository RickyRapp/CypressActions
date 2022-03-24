import { BaseRouteService } from 'core/services';

class SessionPendingCertificateRouteService extends BaseRouteService {
    constructor() {
        super('session-pending-certificate');
        this.adminReviewBase = 'certificates-admin-reviews';
    }

    find(filter) {
        return super.find(this.base + '/{?sessionPendingCertificateStatusIds,search,page,rpp,sort,embed,fields,donorId,charityId,bookletCertificateCode,dollarRange,confirmationNumber,dateCreatedFrom,dateCreatedTo}', filter);
    }

    findByCharity(filter) {
        return super.find(this.base + '/{?sessionPendingCertificateStatusIds,search,page,rpp,sort,embed,fields}', filter);
    }

    getAdminReviewCertificates(filter) {
        return super.find(this.adminReviewBase + '/{?search,page,rpp,sort,embed,fields}', filter);
    }

    putAdminReviewCertificates(filter) {
        return super.update(this.adminReviewBase + '/{id}{?isApproved}', filter);
    }
}

export default SessionPendingCertificateRouteService;

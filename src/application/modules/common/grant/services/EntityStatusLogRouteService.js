import { BaseRouteService } from 'core/services';

class EntityStatusLogRouteService extends BaseRouteService {
    constructor() {
        super('entitystatuslog');
        this.filterFields = 'donorId,charityId,confirmationNumber,bookletCertificateCode,purposeNote,dollarRange,donationStatusIds,donationTypeIds,dateCreatedFrom,dateCreatedTo,search,name,taxId,grantId,page,rpp,sort,embed,fields'
    }

    findStatus(filter) {
        return super.find(this.base + `/{?${this.filterFields}}`, filter);
    }
}

export default EntityStatusLogRouteService;

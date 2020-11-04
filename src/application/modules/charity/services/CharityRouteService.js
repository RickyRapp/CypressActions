import { BaseRouteService } from 'core/services';

class CharityRouteService extends BaseRouteService {
    constructor() {
        super('charity');
    }

    getCharityLoginProfile(id) {
        return super.find(this.base + '/login-profile/{id}', id);
    }

    find(filter) {
        return super.find(this.base + '/{?search,name,taxId,address,charityId,page,rpp,sort,embed,fields}', filter);
    }

    findGrants(filter) {
        return super.find(this.base + '/grants/{?page,rpp,sort,embed,fields}', filter);
    }

    findCertificates(filter) {
        return super.find(this.base + '/certificates/{?page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    processUpdateFile(id) {
        return super.get(this.base + '/process-update-file/{id}', id);
    }

    create() {
        return super.create(this.base);
    }

    suggest() {
        return super.create(this.base + '/suggest');
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    search(filter) {
        return super.find(this.base + '/search/{?id,search,name,dba,taxId,address,charityTypeIds,page,rpp,sort,embed,fields,exceptId}', filter);
    }

    taxIdExists(taxId) {
        return super.get(this.base + '/tax-id/{taxId}/exists/', null, { taxId: taxId });
    }

    createOnlineAccount(resource) {
        return super.create(this.base + '/create-online-account/{id}', resource);
    }

    phoneNumberExists(phoneNumber) {
        return super.get(this.base + '/phone-number/{phoneNumber}/exists/', null, { phoneNumber: phoneNumber });
    }
}

export default CharityRouteService;

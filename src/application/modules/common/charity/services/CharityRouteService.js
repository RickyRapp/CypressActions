import { BaseRouteService } from 'core/services';

class CharityRouteService extends BaseRouteService {
    constructor() {
        super('charity');
    }

    getCharityLoginProfile(id) {
        return super.get(this.base + '/login-profile/{id}', id);
    }

    find(filter) {
        return super.find(this.base + '/{?search,name,taxId,address,charityId,page,rpp,sort,embed,fields}', filter);
    }

    findPending(filter) { console.log("2");
        return super.find(this.base + '/get-pending/{?search,name,taxId,address,charityId,page,rpp,sort,embed,fields}', filter);
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

    updateWithPlaid(resource) {
        return super.update(this.base + '/plaid/{id}', resource);
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

    changeUsername(resource) {
        return super.update(this.base + '/charity/{id}/general-data', resource);
    }

    approve(id) {
        return super.update(this.base + '/approve/{id}', {id: id});
    }

    search(filter) {
        return super.find(this.base + '/search/{?id,search,name,dba,taxId,address,charityTypeIds,page,rpp,sort,embed,fields,exceptId,advancedSearch}', filter);
    }

    taxIdExists(taxId) {
        return super.get(this.base + '/tax-id/{taxId}/exists/', null, { taxId: taxId });
    }

    createOnlineAccount(resource) {
        return super.create(this.base + '/create-online-account/{id}', resource);
    }
}

export default CharityRouteService;

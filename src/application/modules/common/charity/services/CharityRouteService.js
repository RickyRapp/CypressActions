import { BaseRouteService } from 'core/services';

class CharityRouteService extends BaseRouteService {
    constructor() {
        super('charity');
    }

    getCharityLoginProfile(id) {
        return super.get(this.base + '/login-profile/{id}', id);
    }

    getCharityAccountBalance(id){
        return super.get(this.base + '/account-balance/{id}', id);
    }

    getCharityAvailableBalance(id){
        return super.get(this.base + '/available-balance/{id}', id);
    }

    find(filter) {
        return super.find(this.base + '/{?search,name,taxId,address,charityId,page,rpp,sort,embed,fields}', filter);
    }

    findPending(filter) { 
        return super.find(this.base + '/get-pending/{?search,name,taxId,address,charityId,page,rpp,sort,embed,fields,isPendingUserAccount,isPendingBankAccount}', filter);
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

    getCharityQuestionnaireAnswers(id, options) { 
        return super.get(this.base + '/answers/{id}/{?embed,fields}', id, options);
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

    updateCharityVerificationDocument(resource){
        return super.update(this.base + '/user-verification-document/{id}', {id: resource.id});
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

    verifyCharityUserAccount(id){
        return super.update(this.base + '/verify-user-account/{id}', {id: id});
    }
}

export default CharityRouteService;

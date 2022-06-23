import { BaseRouteService } from 'core/services';

class GrantRouteService extends BaseRouteService {
    constructor() {
        super('grant');
        this.filterFields = 'donorId,charityId,confirmationNumber,bookletCertificateCode,purposeNote,dollarRange,donationStatusIds,donationTypeIds,dateCreatedFrom,dateCreatedTo,search,name,taxId,grantId,page,rpp,sort,embed,fields,isWithdraw'
    }

    find(filter) {
        return super.find(this.base + `/{?${this.filterFields}}`, filter);
    }

    findSummaryPastGrant(params) {
        return super.find(this.base + '/summary/{?donorId,charityId,donationStatusIds,donationTypeIds,page,rpp,sort,embed,fields}', params);
    }

    findPastGrant(params) {
        return super.find(this.base + '/donor/{?donorId,charityId,donationStatusIds,donationTypeIds,searchQuery,dollarRange,confirmationNumber,grantMemo,bookletCertificateCode,dateCreatedFrom,dateCreatedTo,page,rpp,sort,embed,fields}', params);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?donorId,embed,fields}', id, options);
    }

    getDonorInformation(id) {
        return super.get(this.base + '/donor-information/{id}', id);
    }

    getDonorFromCard(resource) {
        return super.find(this.base + '/card-number/{?cardNumber,cvv}', resource);
    }

    isEligibleForEdit(id) {
        return super.get(this.base + '/is-eligible-for-edit/{id}', id);
    }

    create() {
        return super.create(this.base);
    }

    createGivingCard() {
        return super.create(this.base + '/create')
    }

    createWithdraw(){
        return super.create(this.base + '/withdraw');
    }

    createCharityGivingCard() {
        return super.create(this.base + '/charity-giving-card');
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    approve(resource) {
        return super.update(this.base + '/approve/{id}', resource);
    }

    decline(resource) {
        return super.update(this.base + '/decline/{id}', resource);
    }

    cancel(resource) {
        return super.update(this.base + '/cancel/{id}', resource);
    }

    export(filter) {
        return super.find(this.base + `/search-export/{?exportFields,exportLimit,exportType,${this.filterFields}}`, filter);
    }

    exportDonor(filter) {
        return super.find(this.base + `/search-export-donor/{?exportFields,donorId,exportLimit,exportType,${this.filterFields}}`, filter);
    }
}

export default GrantRouteService;

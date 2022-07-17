import { BaseRouteService } from 'core/services';

class ContributionRouteService extends BaseRouteService {
    constructor() {
        super('contribution');
    }

    find(filter) {
        return super.find(this.base + '/{?partyId,paymentTypeIds,contributionReviewId,confirmationNumber,dollarRange,paymentNumber,contributionStatusIds,nameOnCheck,amountRangeMin,amountRangeMax,accountTypeId,dateCreatedFrom,dateCreatedTo,search,nameOnCheck,contributionId,page,rpp,sort,embed,fields}', filter);
    }

    findSummary(filter) {
        return super.find(this.base + '/timeline/{?donorId,paymentTypeIds,confirmationNumber,dollarRange,paymentNumber,contributionStatusIds,nameOnCheck,amountRangeMin,amountRangeMax,accountTypeId,dateCreatedFrom,dateCreatedTo,search,nameOnCheck,contributionId,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    getDetails(id, options) {
        return super.get(this.base + '/details/{id}/{?embed,fields}', id, options);
    }

    getDonorInformation(id) {
        return super.get(this.base + '/donor-information/{id}', id);
    }

    create() {
        return super.create(this.base);
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    review(resource) {
        return super.update(this.base + '/review/{id}', resource);
    }

    achBatchCurrentNumber({ increment }) {
        return this.base + `/current-contribution-ach-batch-number?increment=${increment}`;
    }

    generateCsvContributionFile(resource) {
        return super.update(this.base + `/generate-csv`, resource);
    }
}

export default ContributionRouteService;

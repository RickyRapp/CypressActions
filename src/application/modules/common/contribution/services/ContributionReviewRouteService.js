import { BaseRouteService } from 'core/services';

class ContributionReviewRouteService extends BaseRouteService {
    constructor() {
        super('contribution-reviews');
    }

    find(filter) {
        return super.find(this.base + '/{?searchQuery,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    getDetails(id, options) {
        return super.get(this.base + '/details/{id}/{?embed,fields}', id, options);
    }

    achBatchCurrentNumber({ increment }) {
        return this.base + `/current-contribution-ach-batch-number?increment=${increment}`;
    }

    generateCsvContributionFile(resource) {
        return super.update(this.base + `/generate-csv`, resource);
    }

    reviewBatchToProcess(resource){
        return super.update(this.base + '/process-batch', resource);
    }
}

export default ContributionReviewRouteService;

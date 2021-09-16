import { BaseRouteService } from 'core/services';

class DonorToDonorRouteService extends BaseRouteService {
    constructor() {
        super('donor-to-donor');
    }

    find(filter) {
        return super.find(this.base + '/{?search,donorId,emailOrAccNumber,page,rpp,sort,embed,fields}', filter);
    }

    loadDonorData(id) {
        return super.get(this.base + '/donor-information/{id}', id);
    }

    create() {
        return super.create(this.base);
      }
}

export default DonorToDonorRouteService;

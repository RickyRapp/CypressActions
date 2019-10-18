import { BaseRouteService } from 'core/services';

class DonorAccountFileStreamRouteService extends BaseRouteService {
    constructor() {
        super('donor-file-streams');
    }

    find(filter) {
        return super.find(this.base + '/{?search,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    getPreview(id, options) {
        return super.get(ApplicationSettings.useSSL ? 'https://' : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" + this.base + '/{id}/{?embed}', id, options);
    }

    create(resource) {
        return super.create(this.base, resource);
    }

    uploadDonorAccountBankAccount(donorAccountId, bankAccountId, filename) {
        return super.create(this.base + '/{donorAccountId}/bank-account/{id}/{filename}/{?embed}', { donorAccountId: donorAccountId, id: bankAccountId, filename: filename });
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    delete(resource) {
        return super.delete(this.base + '/{id}', resource);
    }
}

export default DonorAccountFileStreamRouteService;

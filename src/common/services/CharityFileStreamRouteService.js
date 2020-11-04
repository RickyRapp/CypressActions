import { BaseRouteService } from 'core/services';

class CharityFileStreamRouteService extends BaseRouteService {
    constructor() {
        super('charity-file-streams');
    }

    find(filter) {
        return super.find(this.base + '/{?search,page,rpp,sort,embed,fields}', filter);
    }

    get(id, options) {
        return super.get(this.base + '/{id}/{?embed,fields}', id, options);
    }

    getPreview(id, options) {
        return super.get(ApplicationSettings.useSSL ? 'https://' : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" + this.base + '/{id}/{?embed}', id, options);// eslint-disable-line
    }

    create(resource) {
        return super.create(this.base, resource);
    }

    uploadCharityBankAccount(charityId, bankAccountId, filename) {
        return super.create(this.base + '/{charityId}/bank-account/{id}/{filename}/{?embed}', { charityId: charityId, id: bankAccountId, filename: filename });
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    delete(resource) {
        return super.delete(this.base + '/{id}', resource);
    }
}

export default CharityFileStreamRouteService;

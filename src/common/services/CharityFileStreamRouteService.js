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
        return super.get(ApplicationSettings.useSSL ? 'https://' : 'http://' + ApplicationSettings.appUrl + "/" + ApplicationSettings.appId + "/" + this.base + '/{id}/{?embed}', id, options);
    }

    create(resource) {
        return super.create(this.base, resource);
    }

    uploadCharityBankAccount(charityId, filename) {
        return super.create(this.base + '/{charityId}/bank-account/{filename}/{?embed}', { charityId: charityId, filename: filename });
    }

    uploadCharityUpdateFile(filename) {
        return super.create(this.base + '/update-file/{filename}', { filename: filename });
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    delete(resource) {
        return super.delete(this.base + '/{id}', resource);
    }
}

export default CharityFileStreamRouteService;

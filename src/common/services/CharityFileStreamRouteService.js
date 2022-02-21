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

    getCharityMedia(charityId, mediaType) {
        return super.get(this.base + '/{charityId}/media-gallery/{mediaType}/{?embed}', { charityId: charityId, mediaType: mediaType });
    }

    create(resource) {
        return super.create(this.base, resource);
    }

    uploadCharityBankAccount(charityId, bankAccountId, filename) {
        return super.create(this.base + '/{charityId}/bank-account/{id}/{filename}/{?embed}', { charityId: charityId, id: bankAccountId, filename: filename });
    }

    uploadCharityMedia(charityId, filename, mediaType) {
        return super.create(this.base + '/{charityId}/media-gallery/{filename}/{mediaType}/{?embed}', { charityId: charityId, filename: filename, mediaType: mediaType });
    }

    update(resource) {
        return super.update(this.base + '/{id}', resource);
    }

    delete(resource) {
        return super.delete(this.base + '/{id}', resource);
    }
}

export default CharityFileStreamRouteService;

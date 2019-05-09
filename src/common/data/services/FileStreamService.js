import { FileStreamRouteService } from 'common/data';
import { BaseService } from 'core/services';
import * as uritemplate from 'uritemplate';
import _ from 'lodash';

class FileStreamService extends BaseService {
    constructor(apiClient) {
        super(apiClient, new FileStreamRouteService());
        this.apiClient = apiClient;
        this.uriTemplateService = uritemplate;
        this.charityPath = 'charity/';
        this.bankAccountPath = 'bank-account/';
    }

    async createCharityBankAccountImage(file, userId, embed = null) {
        let formData = new FormData();
        formData.append('file', file, file.name);
        const url = this.uriTemplateService.parse(this.routeService.rootBase + userId + this.bankAccountPath + file.name + '{?embed}').expand({ embed: embed });
        return await this.create(url, formData);
    }

    async tdfCreateCharityBankAccountImage(file, userId, embed = null) {
        let formData = new FormData();
        formData.append('file', file, file.name);
        const url = this.uriTemplateService.parse(this.routeService.base + this.charityPath + this.bankAccountPath + file.name + '{?userId,embed}').expand({ userId: userId, embed: embed });
        return await this.create(url, formData);
    }


    async createDonorAccountBankAccountImage(file, userId, embed = null) {
        let formData = new FormData();
        formData.append('file', file, file.name);
        const url = this.uriTemplateService.parse(this.routeService.rootBase + userId + this.bankAccountPath + file.name + '{?embed}').expand({ embed: embed });
        return await this.create(url, formData);
    }

    async create(url, formData) {
        var req = {
            method: 'POST',
            url: url,
            data: formData
        }

        const response = await this.apiClient.request(req);
        return response || null;
    }
}

export default FileStreamService;

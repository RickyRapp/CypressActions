import { action } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { ThirdPartyWebsiteCreateForm } from 'application/administration/third-party-website/forms';
import { ThirdPartyWebsiteService } from 'application/administration/third-party-website/services';
import { CharityService } from 'application/charity/services';
import _ from 'lodash';

class ThirdPartyWebsiteCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, id, onAfterAction) {
        const service = new ThirdPartyWebsiteService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'third-party-website-edit',
            id: id,
            autoInit: true,
            actions: () => {
                return {
                    update: async (resource) => {
                        resource.ip = resource.ip.slice(0, 3) + '.' + resource.ip.slice(3);
                        resource.ip = resource.ip.slice(0, 7) + '.' + resource.ip.slice(7);
                        resource.ip = resource.ip.slice(0, 11) + '.' + resource.ip.slice(11);

                        this.validateIPaddress(resource.ip);
                        await this.validateCharitySetting(resource.charityId)

                        if (!this.form.isValid) {
                            throw { data: { message: "There is a problem with form." } };
                        }
                        await service.update({ id: id, ...resource });
                    },
                    create: async (resource) => {
                        resource.ip = resource.ip.slice(0, 3) + '.' + resource.ip.slice(3);
                        resource.ip = resource.ip.slice(0, 7) + '.' + resource.ip.slice(7);
                        resource.ip = resource.ip.slice(0, 11) + '.' + resource.ip.slice(11);

                        this.validateIPaddress(resource.ip);
                        await this.validateCharitySetting(resource.charityId)

                        if (!this.form.isValid) {
                            throw { data: { message: "There is a problem with form." } };
                        }
                        await service.create(resource);
                    },
                    get: async (id) => {
                        let params = { embed: 'charity' }
                        let response = await service.get(id, params);
                        return response.data;
                    }
                }
            },
            onAfterAction: onAfterAction,
            FormClass: ThirdPartyWebsiteCreateForm,
        });

        this.service = service;
        this.id = id;

        this.charityDropdownStore = new BaasicDropdownStore({
            placeholder: 'THIRD_PARTY_WEBSITE.CREATE.FIELDS.SELECT_CHARITY',
            initFetch: false,
            filterable: true,
            clearable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const charityService = new CharityService(rootStore.application.baasic.apiClient);
                    const response = await charityService.search({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name'
                        ]
                    });
                    return _.map(response.item, x => { return { id: x.id, name: x.name } });
                },
                onChange: this.validateCharitySetting
            });
    }

    async getResource(id) {
        await super.getResource(id);
        if (this.item && this.item.charity) {
            this.charityDropdownStore.setValue({ id: this.item.charity.id, name: this.item.charity.name })
        }
    }

    @action.bound
    async validateCharitySetting(charityId) {
        if (charityId) {
            const params = {
                embed: 'charity',
                charityIds: [charityId]
            }
            if (this.id) {
                params.exceptIds = [this.id];
            }
            let response = await this.service.find(params);
            if (response.data && response.data.item && response.data.item.length > 0) {
                this.form.$('charityId').invalidate('Setting already defined for this charity.')
            }
            else {
                this.form.$('charityId').resetValidation()
            }
        }
        else {
            this.form.$('charityId').resetValidation()
        }
    }

    @action.bound
    validateIPaddress(value) {
        const ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (value.match(ipformat)) {
            this.form.$('ip').resetValidation()
        }
        else {
            this.form.$('ip').invalidate('Invalid format.')
        }
    }
}

export default ThirdPartyWebsiteCreateViewStore;

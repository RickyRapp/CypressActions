import { action } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { CharityWebsiteCreateForm } from 'application/administration/charity-website/forms';
import { charityFormatter } from 'core/utils';

class CharityWebsiteCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, id, onAfterAction) {
        super(rootStore, {
            name: 'charity-website-edit',
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
                        await rootStore.application.administration.charityWebsiteStore.updateCharityWebsite({ id: id, ...resource });
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
                        await rootStore.application.administration.charityWebsiteStore.createCharityWebsite(resource);
                    },
                    get: async (id) => {
                        let params = { embed: 'charity' }
                        return rootStore.application.administration.charityWebsiteStore.getCharityWebsite(id, params);
                    }
                }
            },
            onAfterAction: onAfterAction,
            FormClass: CharityWebsiteCreateForm,
        });

        this.id = id;
        this.createCharityDropdownStore();
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
            this.charityDropdownStore.setValue(null)
            this.form.$('charityId').resetValidation();
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

    createCharityDropdownStore() {
        this.charityDropdownStore = new BaasicDropdownStore({
            placeholder: 'CHARITY_WEBSITE.CREATE.FIELDS.SELECT_CHARITY',
            initFetch: false,
            filterable: true,
            clearable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.charityStore.searchCharity({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'name|asc',
                        embed: [
                            'charityAddresses',
                            'charityAccountType'
                        ],
                        fields: [
                            'id',
                            'taxId',
                            'name',
                            'charityAccountType',
                            'charityAddresses'
                        ]
                    });
                    return data.item.map(x => {
                        return {
                            id: x.id,
                            name: charityFormatter.format(x, { value: 'charity-name-display' }),
                            item: x
                        }
                    });
                },
                onChange: this.validateCharitySetting
            });
    }
}

export default CharityWebsiteCreateViewStore;

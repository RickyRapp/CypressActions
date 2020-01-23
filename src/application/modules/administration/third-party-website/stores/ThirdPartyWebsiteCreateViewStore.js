import { BaseEditViewStore } from 'core/stores';
import { ThirdPartyWebsiteCreateForm } from 'application/administration/third-party-website/forms';
import { ThirdPartyWebsiteService } from 'application/administration/third-party-website/services';
import { action } from 'mobx';

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

                        if (!this.form.isValid) {
                            throw { data: { message: "There is a problem with form." } };
                        }
                        await service.create(resource);
                    },
                    get: async (id) => {
                        let response = await service.get(id);
                        return response.data;
                    }
                }
            },
            onAfterAction: onAfterAction,
            FormClass: ThirdPartyWebsiteCreateForm,
        });
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

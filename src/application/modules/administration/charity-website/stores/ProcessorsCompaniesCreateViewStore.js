import { action, observable } from 'mobx';
import { BaseEditViewStore, BaasicDropdownStore } from 'core/stores';
import { ProcessorsCompaniesCreateForm } from 'application/administration/charity-website/forms';
import { charityFormatter } from 'core/utils';
import _ from  'lodash';

class ProcessorsCompaniesCreateViewStore extends BaseEditViewStore {
    constructor(rootStore, id, onAfterAction) {
        super(rootStore, {
            name: 'processing-companies-edit',
            id: id,
            autoInit: true,
            actions: () => {
                return {
                    update: async (resource) => {

                        if (!this.form.isValid) {
                            throw { data: { message: "There is a problem with form." } };
                        }
                        await rootStore.application.administration.charityWebsiteStore.updateCharityWebsite({ id: id, ...resource });
                    },
                    create: async (resource) => {

                        if (!this.form.isValid) {
                            throw { data: { message: "There is a problem with form." } };
                        }
                        await rootStore.application.administration.charityWebsiteStore.createCharityWebsite(resource);
                    },
                    get: async (id) => {
                        return rootStore.application.administration.charityWebsiteStore.getCharityWebsite(id, params);
                    }
                }
            },
            onAfterAction: onAfterAction,
            FormClass: ProcessorsCompaniesCreateForm,
        });

        this.id = id;
    }
}

export default ProcessorsCompaniesCreateViewStore;

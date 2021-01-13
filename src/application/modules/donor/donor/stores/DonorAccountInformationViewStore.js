import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorEditForm } from 'application/donor/donor/forms';
import { applicationContext } from 'core/utils';

@applicationContext
class DonorAccountInformationViewStore extends BaseEditViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'general-data',
            id: rootStore.userStore.applicationUser.id,
            actions: {
                get: async (id) => {
                    return rootStore.application.donor.donorStore.getDonor(
                        id,
                        {
                            fields: 'prefixTypeId,firstName,lastName,dateOfBirth,fundName,securityPin'
                        });
                },
                update: async (resource) => {
                    await rootStore.application.donor.donorStore.updateGeneralData(resource);
                }
            },
            FormClass: DonorEditForm,
        });

        this.donorId = this.id;

        this.createPrefixTypeDropdownStore();
    }

    createPrefixTypeDropdownStore() {
        this.prefixTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.prefixTypeStore.find();
            }
        });
    }
}

export default DonorAccountInformationViewStore;

import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { DonorEditForm } from 'application/donor/donor/forms';
import { applicationContext } from 'core/utils';
import { action, observable } from 'mobx';
import moment from 'moment';
import _ from 'lodash';

@applicationContext
class DonorAccountInformationViewStore extends BaseEditViewStore {
    @observable isEditEnabled = TextTrackCueList;

    constructor(rootStore) {
        super(rootStore, {
            name: 'general-data',
            id: rootStore.userStore.applicationUser.id,
            actions: {
                get: async (id) => {
                    return rootStore.application.donor.donorStore.getDonor(
                        id,
                        {
                            fields: 'prefixType,prefixTypeId,firstName,lastName,dateOfBirth,fundName,securityPin'
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
        this.createMonthDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
        else {
            await this.fetch([this.getResource(this.id)]);
            if (this.item) {
                const date = moment(this.item.dateOfBirth);
                this.form.$('month').set(_.find(this.monthDropdownStore.items, { id: (date.month() + 1).toString() }).id);
                this.form.$('day').set(date.date());
                this.form.$('year').set(date.year());
            }
        }
    }

    createPrefixTypeDropdownStore() {
        this.prefixTypeDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return this.rootStore.application.lookup.prefixTypeStore.find();
            }
        });
    }

    createMonthDropdownStore() {
        this.monthDropdownStore = new BaasicDropdownStore(null, {
            fetchFunc: async () => {
                return [
                    { id: '1', name: 'January' },
                    { id: '2', name: 'February' },
                    { id: '3', name: 'March' },
                    { id: '4', name: 'April' },
                    { id: '5', name: 'May' },
                    { id: '6', name: 'June' },
                    { id: '7', name: 'July' },
                    { id: '8', name: 'August' },
                    { id: '9', name: 'September' },
                    { id: '10', name: 'October' },
                    { id: '11', name: 'November' },
                    { id: '12', name: 'December' },
                ];
            },
        });
    }

    @action.bound
    onEnableEditClick() {
        this.isEditEnabled = !this.isEditEnabled;
    }
}

export default DonorAccountInformationViewStore;

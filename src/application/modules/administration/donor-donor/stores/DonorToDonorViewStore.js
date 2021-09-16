import { action, observable } from 'mobx';
import { BaasicDropdownStore, BaseEditViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { DonorToDonorCreateForm } from 'application/administration/donor-donor/forms';
import { donorFormatter } from 'core/utils';
import _ from 'lodash'

@applicationContext
class DonorToDonorViewStore extends BaseEditViewStore {
    @observable donorSenderId = null;
    @observable donorRecipientId = null;
    donor = null;
    applicationDefaultSetting = {};

    constructor(rootStore, { donorId, donorToDonorStore, onClickDonorFromFilter, onChange }) {
        super(rootStore, {
            name: 'donor-transaction',
            id: undefined,
            autoInit: false,
            actions: () => {
                return {
                    create: async resource => {
                        resource.donorId = this.donorId;
                        await rootStore.application.administration.donorToDonorStore.createTransaction(resource);
                    },
                };
            },
            FormClass: DonorToDonorCreateForm,
        });

        this.donorId = donorId;
        this.donorToDonorStore = donorToDonorStore;
        this.onClickDonorFromFilter = onClickDonorFromFilter;
        this.onChange = onChange;

        this.createDonorSenderDropdownStore();
        this.createDonorRecipientDropdownStore();
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        } else {

            this.setFormDefaultRules();

            this.form.$('donorSenderId').observe(({ field }) => {
                this.donorSenderId = field.value
            });

            this.form.$('donorRecipientId').observe(({ field }) => {
                this.donorRecipientId = field.value
            });
        }
    }

    @action.bound
    setFormDefaultRules() {
        if (this.rootStore.permissionStore.hasPermission('theDonorsFundAdministrationSection.create')) {
            this.form.$('amount').set('rules', this.form.$('amount').rules + '|min:0');
        }
    }

    createDonorSenderDropdownStore() {
        this.selectDonorSenderDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.donorStore.searchDonor({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return _.map(data.item, x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                onChange: this.onChange
            });
    }

    createDonorRecipientDropdownStore() {
        this.selectDonorRecipientDropdownStore = new BaasicDropdownStore({
            initFetch: false,
            filterable: true
        },
            {
                fetchFunc: async (searchQuery) => {
                    const data = await this.rootStore.application.administration.donorStore.searchDonor({
                        pageNumber: 1,
                        pageSize: 10,
                        search: searchQuery,
                        sort: 'firstName|asc',
                        embed: [
                            'donorAddresses'
                        ],
                        fields: [
                            'id',
                            'accountNumber',
                            'donorName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return _.map(data.item, x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                onChange: this.onChange
            });
    }

}

export default DonorToDonorViewStore;

import { TableViewStore, BaseViewStore, BaasicDropdownStore } from 'core/stores';
import { AdministrationService } from 'application/administration/test/services';
import { applicationContext, donorFormatter } from 'core/utils';
import { action, observable } from 'mobx';

@applicationContext
class WelcomeExistingAccountsEmailsViewStore extends BaseViewStore {
    @observable donorId = null;

    constructor(rootStore) {
        super(rootStore)
        this.service = new AdministrationService(rootStore.application.baasic.apiClient)
        this.routes = {}

        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'name',
                    title: 'Name'
                }
            ],
            actions: {
                onClick: async (batch) => {
                    this.tableStore.suspend();
                    await this.service.sendBatch(batch)
                    this.tableStore.resume();
                }
            }
        });

        const data = [
            {
                name: 'Send 1. batch of emails. Total of 400 emails will be sent',
                abrv: '1'
            },
            {
                name: 'Send 2. batch of emails. Total of 400 emails will be sent',
                abrv: '2'
            },
            {
                name: 'Send 3. batch of emails. Total of 400 emails will be sent',
                abrv: '3'
            },
            {
                name: 'Send 4. batch of emails. Total of 400 emails will be sent',
                abrv: '4'
            },
            {
                name: 'Send last batch of emails. Remaining count of emails will be sent',
                abrv: '5'
            },
        ];

        this.tableStore.setData(data)
        if (!this.tableStore.dataInitialized) {
            this.tableStore.dataInitialized = true;
        }

        this.createSearchDonorDropdownStore()
    }

    @action.bound
    async onSendEmail() {
        await this.service.sendWelcome(this.donorId);
        this.searchDonorDropdownStore.setValue(null);
        this.donorId = null;
    }

    createSearchDonorDropdownStore() {
        this.searchDonorDropdownStore = new BaasicDropdownStore({
            placeholder: 'GRANT.LIST.FILTER.SELECT_DONOR_PLACEHOLDER',
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
                            'firstName',
                            'lastName',
                            'securityPin',
                            'donorAddresses'
                        ]
                    });
                    return data.item.map(x => {
                        return {
                            id: x.id,
                            name: donorFormatter.format(x, { type: 'donor-name', value: 'dropdown' })
                        }
                    });
                },
                onChange: (donorId) => {
                    this.donorId = donorId;
                }
            });
    }
}

export default WelcomeExistingAccountsEmailsViewStore;

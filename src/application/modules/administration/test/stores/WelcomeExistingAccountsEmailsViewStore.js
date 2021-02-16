import { TableViewStore, BaseViewStore } from 'core/stores';
import { AdministrationService } from 'application/administration/test/services';
import { applicationContext } from 'core/utils';

@applicationContext
class WelcomeExistingAccountsEmailsViewStore extends BaseViewStore {
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
    }
}

export default WelcomeExistingAccountsEmailsViewStore;

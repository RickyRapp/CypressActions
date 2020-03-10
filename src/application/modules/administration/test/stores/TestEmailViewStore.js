import { action } from 'mobx'
import { TableViewStore, BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';

@applicationContext
class TestEmailViewStore extends BaseViewStore {
    constructor(rootStore) {
        super(rootStore)
        this.routes = {}

        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'name',
                    title: 'TEST.TEST_EMAIL.LIST.COLUMNS.NAME_LABEL'
                },
                {
                    key: 'description',
                    title: 'TEST.TEST_EMAIL.LIST.COLUMNS.DESCRIPTION_LABEL'
                }
            ],
            actions: {
                onSend: (item) => this.openSendModal(item)
            }
        });

        const data = [
            {
                name: 'Register notification to administrator',
                description: '',
                abrv: 'registerNotificationToAdministrator'
            },
            {
                name: 'Canceled contribution notification to donor',
                description: '',
                abrv: 'canceledContributionNotificationToDonor'
            },
            {
                name: 'Create booklet notification',
                description: '',
                abrv: 'createBookletNotification'
            },
            {
                name: 'Create booklet order notification',
                description: '',
                abrv: 'createBookletOrderNotification'
            },
            {
                name: 'Create contribution notification to donor',
                description: '',
                abrv: 'createContributionNotificationToDonor'
            },
            {
                name: 'Declined contribution notification to donor',
                description: '',
                abrv: 'declinedContributionNotificationToDonor'
            },
            {
                name: 'Funded contribution notification to donor',
                description: '',
                abrv: 'fundedContributionNotificationToDonor'
            },
            {
                name: 'Low balance email',
                description: '',
                abrv: 'lowBalanceEmail'
            },
            {
                name: 'Scheduled grant insufficient fund',
                description: '',
                abrv: 'scheduledGrantInsufficientFund'
            },
            {
                name: 'Scheduled grant skipped due to insufficient fund',
                description: '',
                abrv: 'scheduledGrantSkippedDueToInsufficientFund'
            }
        ];

        this.tableStore.setData(data)
        this.emailModal = new ModalParams({});
    }

    @action.bound
    openSendModal(item) {
        this.emailModal.open({
            item: item,
            onAfterAction: () => {
                this.emailModal.close();
            }
        });
    }
}

export default TestEmailViewStore;

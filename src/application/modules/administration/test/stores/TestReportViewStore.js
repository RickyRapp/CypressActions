import { action } from 'mobx'
import { TableViewStore, BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';

@applicationContext
class TestReportViewStore extends BaseViewStore {
    constructor(rootStore) {
        super(rootStore)
        this.routes = {}

        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'name',
                    title: 'TEST.TEST_REPORT.LIST.COLUMNS.NAME_LABEL'
                },
                {
                    key: 'description',
                    title: 'TEST.TEST_REPORT.LIST.COLUMNS.DESCRIPTION_LABEL'
                }
            ],
            actions: {
                onGenerate: (item) => this.openGenerateModal(item)
            }
        });

        this.setTableStore();
        this.reportModal = new ModalParams({});
    }

    async setTableStore() {
        const data = [
            {
                name: 'Contribution pending receipt',
                description: 'Contribution pending PDF receipt',
                abrv: 'contributionPending'
            },
            {
                name: 'Contribution funded receipt',
                description: 'Contribution funded PDF receipt',
                abrv: 'contributionFunded'
            },
            {
                name: 'Grant receipt',
                description: 'Grant receipt PDF',
                abrv: 'grantReceipt'
            },
            {
                name: 'Booklet order',
                description: 'Booklet order PDF',
                abrv: 'bookletOrder'
            },
            {
                name: 'Session report',
                description: 'Session report PDF',
                abrv: 'sessionReport  '
            },
        ]
        this.tableStore.setData(data);
        if (!this.tableStore.dataInitialized) {
            this.tableStore.dataInitialized = true;
        }
    }

    @action.bound
    openGenerateModal(item) {
        this.reportModal.open({
            item: item,
            onAfterAction: () => {
                this.reportModal.close();
            }
        });
    }
}

export default TestReportViewStore;

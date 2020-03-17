import { action } from 'mobx'
import { TableViewStore, BaseViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { LookupService } from 'common/services';

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

        this.setData();
        this.emailModal = new ModalParams({});
    }

    @action.bound
    async setData() {
        const service = new LookupService(this.rootStore.application.baasic.apiClient, 'email-type');
        const response = await service.getAll();
        this.tableStore.setData(response.data)
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

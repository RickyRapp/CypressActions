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

        this.settableStore();
        this.emailModal = new ModalParams({});
    }

    async settableStore() {
        const data = await this.rootStore.application.lookup.emailTypeStore.find();
        this.tableStore.setData(data)
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

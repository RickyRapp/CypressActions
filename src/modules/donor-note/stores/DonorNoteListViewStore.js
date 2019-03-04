import { action, observable } from 'mobx';
import { BaseListViewStore, TableViewStore } from 'core/stores';
import { DonorNoteService } from "common/data";

class DonorNoteListViewStore extends BaseListViewStore {
    @observable filterVisible = false;
    constructor(rootStore) {
        const donorNoteService = new DonorNoteService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor note',
            actions: {
                find: async params => {
                    params.embed = 'createdByCoreUser';
                    params.id = rootStore.routerStore.routerState.params.id;
                    const response = await donorNoteService.find(params);
                    return response;
                }
            }
        });

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'note',
                        title: 'Note'
                    },
                    {
                        key: 'createdByCoreUser.firstName',
                        title: 'By'
                    },
                    {
                        key: 'dateCreated',
                        title: 'Date Created'
                    }
                ],
                actions: {
                    onSort: column => this.queryUtility.changeOrder(column.key)
                }
            })
        );
    }
}

export default DonorNoteListViewStore;

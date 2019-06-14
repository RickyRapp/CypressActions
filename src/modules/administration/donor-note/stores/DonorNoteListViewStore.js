import { action, observable } from 'mobx';
import { BaseListViewStore, TableViewStore } from 'core/stores';
import { DonorNoteService } from "common/data";

class DonorNoteListViewStore extends BaseListViewStore {
    @observable filterVisible = false;
    @observable editNoteId = null;

    constructor(rootStore, { userId }) {
        const donorNoteService = new DonorNoteService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor note',
            actions: {
                find: async params => {
                    if (!userId) {
                        return [];
                    }
                    params.id = userId;
                    const response = await donorNoteService.find(params);
                    return response;
                },
                delete: async note => {
                    return await donorNoteService.delete(note);
                }
            },
            queryConfig: {
                filter: {
                    embed: 'createdByCoreUser',
                    orderBy: 'dateCreated',
                    orderDirection: 'desc',
                    pageSize: 5
                },
                disableUpdateQueryParams: true
            }
        });

        this.permissions = {
            delete: rootStore.authStore.hasPermission('theDonorsFundAdministrationSection.delete')
        }

        this.userId = userId

        this.setTableStore(
            new TableViewStore(this.queryUtility, {
                columns: [
                    {
                        key: 'note',
                        title: 'NOTE'
                    },
                    {
                        key: 'createdByCoreUser',
                        title: 'BY',
                        type: 'function',
                        function: (item) => { return `${item.createdByCoreUser.firstName} ${item.createdByCoreUser.lastName}` }
                    },
                    {
                        key: 'dateCreated',
                        title: 'DATECREATED',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm:ss'
                    }
                ],
                actions: {
                    onEdit: note => this.editNoteId = note.id,
                    onDelete: note => this.delete(note),
                    onSort: column => this.queryUtility.changeOrder(column.key)
                },
                actionsRender: {
                    onDeleteConfig: { permissions: this.permissions }
                }
            })
        );
    }

    @action.bound onAfterCreateEdit() {
        this.editNoteId = null;
        this.queryUtility._reloadCollection();
    }

    @action.bound onCancelEdit() {
        this.editNoteId = null;
    }

    @action.bound
    async delete(note) {
        this.rootStore.modalStore.showConfirm(
            'AREYOUSUREYOUWANTTODELETENOTE',
            async () => {
                this.loaderStore.suspend();
                await this.actions.delete(note);
                this.queryUtility.fetch();
                this.rootStore.notificationStore.success('SUCCESSFULLYDELETED');
                this.loaderStore.resume();
            }
        );
    }
}

export default DonorNoteListViewStore;

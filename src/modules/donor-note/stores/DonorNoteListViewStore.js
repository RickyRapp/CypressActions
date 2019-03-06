import { action, observable } from 'mobx';
import { BaseListViewStore, TableViewStore } from 'core/stores';
import { DonorNoteService } from "common/data";

class DonorNoteListViewStore extends BaseListViewStore {
    @observable filterVisible = false;
    @observable editNoteId = null;

    constructor(rootStore) {
        const donorNoteService = new DonorNoteService(rootStore.app.baasic.apiClient);

        super(rootStore, {
            name: 'donor note',
            actions: {
                find: async params => {
                    if (!rootStore.routerStore.routerState.params.id) {
                        return;
                    }
                    params.id = rootStore.routerStore.routerState.params.id;
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
                        key: 'createdByCoreUser',
                        title: 'By',
                        type: 'object',
                        separator: ' ',
                        additionalColumns: [{
                            key: 'firstName'
                        }, {
                            key: 'lastName'
                        }]
                    },
                    {
                        key: 'dateCreated',
                        title: 'Date Created',
                        type: 'date',
                        format: 'YYYY-MM-DD HH:mm:ss'
                    }
                ],
                actions: {
                    onEdit: note => this.editNoteId = note.id,
                    onDelete: note => this.rootStore.authStore.hasPermission('theDonorsFundAdministrationSection.delete') && this.delete(note),
                    onSort: column => this.queryUtility.changeOrder(column.key)
                }
            })
        );
    }

    @action.bound
    async onAfterEditCreate() {
        this.editNoteId = null;
        this.queryUtility.fetch();
    }

    @action.bound
    async onCancelEdit() {
        this.editNoteId = null;
    }

    @action.bound
    async delete(note) {
        this.rootStore.modalStore.showConfirm(
            'Are you sure you want to delete note?',
            async () => {
                this.loaderStore.suspend();
                await this.actions.delete(note);
                this.queryUtility.fetch();
                this.rootStore.notificationStore.success('Successfully deleted note');
                this.loaderStore.resume();
            }
        );
    }
}

export default DonorNoteListViewStore;

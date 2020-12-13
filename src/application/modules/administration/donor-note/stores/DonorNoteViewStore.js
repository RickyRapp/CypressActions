import { TableViewStore, BaseListViewStore } from 'core/stores';
import { DonorNoteForm } from 'application/administration/donor-note/forms';
import { applicationContext } from 'core/utils';
import { DonorNoteListFilter } from 'application/administration/donor-note/models';
import { action, observable } from 'mobx';

@applicationContext
class DonorNoteViewStore extends BaseListViewStore {
    @observable noteId = null;

    form = new DonorNoteForm({
        onSuccess: async form => {
            const item = form.values();
            if (this.noteId) {
                await this.rootStore.application.administration.donorNoteStore.updateDonorNote({ donorId: this.donorId, id: this.noteId, ...item });
            }
            else {
                await this.rootStore.application.administration.donorNoteStore.createDonorNote({ donorId: this.donorId, ...item });
            }
            this.clearForm();
            this.queryUtility.fetch();
        }
    });

    constructor(rootStore) {
        let filter = new DonorNoteListFilter('dateCreated', 'desc')
        filter.donorId = rootStore.routerStore.routerState.params.id;;

        super(rootStore, {
            name: 'donor-note',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                onResetFilter: (filter) => {
                    filter.reset();
                    filter.donorId = id;
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = ['donor', 'createdByCoreUser'];
                        return rootStore.application.administration.donorNoteStore.findDonorNote(params);
                    }
                }
            }
        });

        this.donorId = rootStore.routerStore.routerState.params.id;
        this.createTableStore();
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'note',
                    title: 'DONOR_NOTE.LIST.COLUMNS.NOTE_LABEL'
                },
                {
                    key: 'createdByCoreUser',
                    title: 'DONOR_NOTE.LIST.COLUMNS.CREATED_BY_LABEL',
                    format: {
                        type: 'created-by',
                        value: 'short'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'GRANT.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (note) => {
                    this.form.$('note').set(note.note);
                    this.noteId = note.id;
                },
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {}
        }));
    }

    @action.bound
    onClearFormClick() {
        this.clearForm();
    }

    clearForm() {
        this.form.$('note').clear();
        this.noteId = null;
    }
}

export default DonorNoteViewStore;

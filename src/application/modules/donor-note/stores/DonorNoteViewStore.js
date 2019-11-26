import { TableViewStore, BaseListViewStore } from 'core/stores';
import { DonorNoteService } from 'application/donor-note/services';
import { DonorNoteForm } from 'application/donor-note/forms';
import { applicationContext } from 'core/utils';
import { DonorNoteListFilter } from 'application/donor-note/models';

@applicationContext
class DonorNoteViewStore extends BaseListViewStore {
    form = new DonorNoteForm({
        onSuccess: async form => {
            const item = form.values();
            if (item.id) {
                await this.service.update(item);
            }
            else {
                await this.service.create(item);
            }
            this.form.$('note').clear();
            this.form.$('id').clear();
            this.queryUtility.fetch();
        }
    });

    constructor(rootStore, { id }) {
        const service = new DonorNoteService(rootStore.application.baasic.apiClient);
        let filter = new DonorNoteListFilter('dateCreated', 'desc')
        filter.donorAccountId = id;

        super(rootStore, {
            name: 'donor-note',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
            },
            queryConfig: {
                filter: filter,
                disableUpdateQueryParams: true,
                onResetFilter: (filter) => {
                    filter.donorAccountId = id;
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'createdByCoreUser',
                            'donorAccount',
                            'donorAccount.coreUser',
                            'donorAccount.companyProfile'
                        ];
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.service = service;
        this.form.$('donorAccountId').set(id);

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
                onEdit: (note) => { this.form.$('note').set(note.note); this.form.$('id').set(note.id); },
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: () => {
                    return true;
                }
            }
        }));
    }
}

export default DonorNoteViewStore;

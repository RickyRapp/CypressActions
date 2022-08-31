import { TableViewStore, BaseListViewStore } from 'core/stores';
import { FilterParams } from 'core/models';

class SessionScanListViewStore extends BaseListViewStore {


    constructor(rootStore) {
        super(rootStore, {
            name: 'session-scan',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
                edit: async (id) => {
                    rootStore.routerStore.goTo('master.app.main.administration.session.session-scan.edit', { id });
                },
                preview: async (id) => {
                    rootStore.routerStore.goTo('master.app.main.administration.session.session-scan.preview', { id });
                },
            },
            queryConfig: {
                filter: new FilterParams()
            },
            actions: () => {
                return {
                    find: async (params) => {
                        const response = await rootStore.application.administration.sessionStore.getScannedSessions(params);
                        return response;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'sessionFolderName',
                    title: 'File name',
                    sortable: false
                },
                {
                    key: 'dateCreated',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    },
                }
            ],
            actions: {
                onEdit: (session) => this.routes.edit(session.id),
                onPreview: (session) => this.routes.preview(session.id),
            },
            actionsRender: {}
        }));
    }

}

export default SessionScanListViewStore;

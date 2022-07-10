import { TableViewStore, BaseListViewStore } from 'core/stores';
import { FilterParams, ModalParams } from 'core/models';
import { action } from 'mobx';

class SessionScanListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'session-scan',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
                edit: async (id) => {
                    rootStore.routerStore.goTo('master.app.main.administration.session-scan.edit', { id: id });
                },
                // preview: async (id) => {
                //     rootStore.routerStore.goTo('master.app.main.administration.session.preview', { id: id });
                // }
            },
            queryConfig: {
                filter: new FilterParams()
            },
            actions: () => {
                return {
                    find: async (params) => {
                        const response = {
                            item: [],
                            recordsPerPage: 10,
                            pageNumber: 1,
                            totalRecords: 100
                        }
                        for (let i = 0; i < 100; i ++) {
                            response.item.push({ fileName: "check " + i, dateCreated: new Date(), id: String(Math.random()) })
                        }
                        this.tableStore.setData(response)
                        return response;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'fileName',
                    title: 'File name',
                },
                {
                    key: 'dateCreated',
                    title: 'SESSION_PENDING_CERTIFICATE.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
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

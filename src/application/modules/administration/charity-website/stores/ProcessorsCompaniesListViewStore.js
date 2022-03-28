import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ProcessorsCompaniesListFilter } from 'application/administration/charity-website/models';
import { ModalParams } from 'core/models';
import { action } from 'mobx';

class ProcessorsCompaniesListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'processing-companies',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {
                create: () => {
                    this.openCreateModal(undefined);
                },
                edit: (id) => {
                    this.openCreateModal(id);
                }
            },
            queryConfig: {
                filter: new ProcessorsCompaniesListFilter('dateCreated', 'desc')
            },
            actions: () => {
                return {
                    find: async (params) => {
                        return rootStore.application.administration.charityWebsiteStore.findCharityWebsite(params);
                    }
                }
            }
        });
        
        this.createTableStore();
        this.createModal = new ModalParams({});
    }

    @action.bound
    openCreateModal(id) {
        this.createModal.open({
            id: id,
            onAfterAction: () => {
                this.queryUtility.fetch();
                this.createModal.close();
            }
        });
    }

    createTableStore() { 
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'name',
                    title: 'PROCESSING_COMPANY.LIST.COLUMNS.NAME_LABEL'
                },
                {
                    key: 'description',
                    title: 'PROCESSING_COMPANY.LIST.COLUMNS.DESCRIPTION_LABEL'
                    
                },
                {
                    key: 'dateCreated',
                    title: 'PROCESSING_COMPANY.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (processingCompany) => this.routes.edit(processingCompany.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {}
        }));
    }
}

export default ProcessorsCompaniesListViewStore;

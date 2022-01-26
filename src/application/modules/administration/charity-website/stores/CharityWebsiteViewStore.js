import { TableViewStore, BaseListViewStore } from 'core/stores';
import { CharityWebsiteListFilter } from 'application/administration/charity-website/models';
import { ModalParams } from 'core/models';
import { action } from 'mobx';

class CharityWebsiteViewStore extends BaseListViewStore {
    constructor(rootStore, websiteType) {
        super(rootStore, {
            name: 'charity-website',
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
                filter: new CharityWebsiteListFilter('dateCreated', 'desc')
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = 'charity';
                        params.type = websiteType;
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
                    title: 'CHARITY_WEBSITE.LIST.COLUMNS.NAME_LABEL'
                },
                {
                    key: 'ip',
                    title: 'CHARITY_WEBSITE.LIST.COLUMNS.IP_LABEL'
                    
                },
                {
                    key: 'url',
                    title: 'CHARITY_WEBSITE.LIST.COLUMNS.URL_LABEL'
                },
                {
                    key: 'charity.name',
                    title: 'CHARITY_WEBSITE.LIST.COLUMNS.CHARITY_LABEL'
                },
                {
                    key: 'isDeleted',
                    title: 'CHARITY_WEBSITE.LIST.COLUMNS.IS_DELETED_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'CHARITY_WEBSITE.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (charityWebsite) => this.routes.edit(charityWebsite.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {}
        }));
    }
}

export default CharityWebsiteViewStore;

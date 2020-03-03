import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ThirdPartyWebsiteService } from 'application/administration/third-party-website/services';
import { ThirdPartyWebsiteListFilter } from 'application/administration/third-party-website/models';
import { ModalParams } from 'core/models';
import { action } from 'mobx';

class ThirdPartyWebsiteViewStore extends BaseListViewStore {
    scanners = null;

    constructor(rootStore) {
        let filter = new ThirdPartyWebsiteListFilter('dateCreated', 'desc')
        const service = new ThirdPartyWebsiteService(rootStore.application.baasic.apiClient);

        super(rootStore, {
            name: 'third-party-website',
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
                filter: filter
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = 'charity';
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'name',
                    title: 'THIRD_PARTY_WEBSITE.LIST.COLUMNS.NAME_LABEL'
                },
                {
                    key: 'ip',
                    title: 'THIRD_PARTY_WEBSITE.LIST.COLUMNS.IP_LABEL'
                },
                {
                    key: 'url',
                    title: 'THIRD_PARTY_WEBSITE.LIST.COLUMNS.URL_LABEL'
                },
                {
                    key: 'charity.name',
                    title: 'THIRD_PARTY_WEBSITE.LIST.COLUMNS.CHARITY_LABEL'
                },
                {
                    key: 'isDeleted',
                    title: 'THIRD_PARTY_WEBSITE.LIST.COLUMNS.IS_DELETED_LABEL',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'dateCreated',
                    title: 'THIRD_PARTY_WEBSITE.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (thirdPartyWebsite) => this.routes.edit(thirdPartyWebsite.id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {}
        }));

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
}

export default ThirdPartyWebsiteViewStore;

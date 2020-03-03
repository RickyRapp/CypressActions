import { TableViewStore, BaseListViewStore } from 'core/stores';
import { GrantRequestService } from 'application/grant/services';
import { applicationContext } from 'core/utils';
import { FilterParams, ModalParams } from 'core/models';
import { action } from 'mobx';

@applicationContext
class CharityGrantRequestsViewStore extends BaseListViewStore {
    constructor(rootStore) {
        const service = new GrantRequestService(rootStore.application.baasic.apiClient);
        const filter = new FilterParams();
        filter.orderBy = 'dateCreated';
        filter.orderDirection = 'desc';

        super(rootStore, {
            name: 'charity-grant-requests',
            authorization: 'theDonorsFundCharityAdvancedSection',
            routes: {
                create: () => {
                    this.openCreateModal();
                },
            },
            queryConfig: {
                filter: filter
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = ['grantRequestStatus'];
                        params.fields = [
                            'amount',
                            'phoneNumber',
                            'grantRequestStatus',
                            'dateCreated',
                            'id'
                        ]
                        const response = await service.findCharityGrantRequest(params);
                        return response.data;
                    }
                }
            }
        });

        this.id = rootStore.routerStore.routerState.params.id;
        this.service = service;

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'amount',
                    title: 'CHARITY_GRANTS.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'phoneNumber',
                    title: 'CHARITY_GRANTS.LIST.COLUMNS.PHONE_NUMBER_LABEL',
                    format: {
                        type: 'phone-number'
                    }
                },
                {
                    key: 'grantRequestStatus.name',
                    title: 'GRANT_REQUEST.LIST.COLUMNS.STATUS_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'CHARITY_GRANTS.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key),
                onCancel: (item) => this.cancelRequest(item)
            },
            actionsRender: {
                onCancelRender: (item) => {
                    return item.grantRequestStatus.abrv === 'open';
                }
            }
        }));

        this.createModal = new ModalParams({});
    }

    @action.bound
    async cancelRequest(item) {
        this.rootStore.modalStore.showConfirm(
            'Are you sure you want to cancel request?',
            async () => {
                this.loaderStore.suspend();
                if (item.grantRequestStatus.abrv === 'open') {
                    await this.service.cancel({ id: item.id });
                }

                await this.queryUtility.fetch();
                this.rootStore.notificationStore.success('Successfully canceled');
                this.loaderStore.resume();
            }
        );
    }

    @action.bound
    openCreateModal() {
        this.createModal.open({
            onAfterAction: () => {
                this.queryUtility.fetch();
                this.createModal.close();
            }
        });
    }

}

export default CharityGrantRequestsViewStore;

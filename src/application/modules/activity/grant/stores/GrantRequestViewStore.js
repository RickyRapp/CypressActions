import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { ModalParams } from 'core/models';
import { GrantRequestListFilter } from 'application/grant/models';

class GrantRequestViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'grant-request',
            authorization: 'theDonorsFundGrantRequestSection',
            routes: {},
            queryConfig: {
                filter: new GrantRequestListFilter('dateCreated', 'desc'),
                onResetFilter: (filter) => {
                    filter.reset();
                }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity',
                            'grantRequestStatus',
                            'grant'
                        ];
                        params.fields = [
                            'id',
                            'amount',
                            'dateCreated',
                            'charity',
                            'grantRequestStatus',
                            'grant'
                        ];

                        params.donorId = rootStore.userStore.user.id;
                        return rootStore.application.activity.activityStore.findGrantRequest(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.createGrantCreateOverviewModal();
    }

    @action.bound
    async setAndOpenCompleteModal(item) {
        const grantAcknowledgmentTypes = await this.rootStore.application.lookup.grantAcknowledgmentTypeStore.find();
        const grantPurposeTypes = await this.rootStore.application.lookup.grantPurposeTypeStore.find();

        item.grantAcknowledgmentType = grantAcknowledgmentTypes.find(c => c.abrv === 'remain-anonymous');
        item.grantPurposeType = grantPurposeTypes.find(c => c.abrv === 'where-deemed-most-needed');

        this.grantCreateOverviewModal.open({
            item: item
        });
    }

    @action.bound
    async onConfirm() {
        this.loaderStore.suspend();
        const id = this.grantCreateOverviewModal.data.item.id;
        await this.rootStore.application.activity.activityStore.completeGrantRequest({ id: id });
        await this.queryUtility.fetch();
        this.grantCreateOverviewModal.close();
        this.rootStore.notificationStore.success('Successfully declined');
        this.loaderStore.resume();
    }

    @action.bound
    async declineRequest(item) {
        this.rootStore.modalStore.showConfirm(
            'Are you sure you want to decline request?',
            async () => {
                this.loaderStore.suspend();
                await this.rootStore.application.activity.activityStore.declineGrantRequest({ id: item.id });
                await this.queryUtility.fetch();
                this.rootStore.notificationStore.success('Successfully declined');
                this.loaderStore.resume();
            }
        );
    }

    createTableStore() {
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'charity.name',
                    title: 'GRANT_REQUEST.LIST.COLUMNS.CHARITY_LABEL',
                },
                {
                    key: 'amount',
                    title: 'GRANT_REQUEST.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'grantRequestStatus.name',
                    title: 'GRANT_REQUEST.LIST.COLUMNS.STATUS_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'GRANT_REQUEST.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key),
                onComplete: (item) => this.setAndOpenCompleteModal(item),
                onDecline: (item) => this.declineRequest(item)
            },
            actionsRender: {
                onCompleteRender: (item) => {
                    return item.grantRequestStatus.abrv === 'open';
                },
                onDeclineRender: (item) => {
                    return item.grantRequestStatus.abrv === 'open';
                }
            }
        }));
    }

    createGrantCreateOverviewModal() {
        this.grantCreateOverviewModal = new ModalParams({
            onClose: () => {
                this.grantCreateOverviewModal.data = {};
            }
        });
    }
}

export default GrantRequestViewStore;

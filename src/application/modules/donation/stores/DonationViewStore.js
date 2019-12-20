import { observable } from 'mobx';
import { SelectTableWithRowDetailsViewStore, BaseListViewStore } from 'core/stores';
import { DonationService } from 'application/donation/services';
import { applicationContext } from 'core/utils';
import { DonationListFilter } from 'application/donation/models';

@applicationContext
class DonationViewStore extends BaseListViewStore {
    @observable charity = null;

    constructor(rootStore) {
        let filter = new DonationListFilter();
        const charityId = rootStore.routerStore.routerState.queryParams.charityId;
        const pendingStatusId = rootStore.routerStore.routerState.queryParams.pendingStatusId;
        filter.charityId = charityId;
        filter.pendingStatusId = pendingStatusId;
        filter.pageSize = 1000;

        super(rootStore, {
            name: 'donation',
            authorization: 'theDonorsFundDonationSection',
            routes: {
                editGrant: (id, grantId) =>
                    rootStore.routerStore.goTo(
                        'master.app.main.grant.edit', { id: id, editId: grantId }),
                editSession: (id) =>
                    rootStore.routerStore.goTo(
                        'master.app.main.session.edit', { id: id })
            },
            queryConfig: {
                filter: filter
            },
            actions: () => {
                const service = new DonationService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'grants',
                            'grants.donorAccount',
                            'charity',
                            'charity.charityType',
                            'charity.charityStatus',
                            'charity.charityBankAccounts',
                            'charity.charityAddresses',
                            'donationType',
                            'donationStatus',
                            'sessions',
                            'sessions.sessionCertificates',
                            'sessions.sessionCertificates.certificate',
                            'sessions.sessionCertificates.certificate.booklet',
                            'sessions.sessionCertificates.certificate.booklet.denominationType',
                            'sessions.sessionCertificates.certificate.booklet.bookletOrderItemBooklets',
                            'sessions.sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem',
                            'sessions.sessionCertificates.certificate.booklet.bookletOrderItemBooklets.bookletOrderItem.bookletOrder'
                        ];
                        const response = await service.findOverview(params);
                        if (response.data && response.data.item && response.data.item.length > 0) {
                            this.charity = response.data.item[0].charity;
                        }
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new SelectTableWithRowDetailsViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'amount',
                    title: 'DONATION.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    },
                },
                {
                    key: 'donationType.name',
                    title: 'DONATION.LIST.COLUMNS.DONATION_TYPE_NAME_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'DONATION.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actions: {
                onEdit: (donation) => {
                    if (donation.donationType.abrv === 'grant') {
                        this.routes.editGrant(donation.grants[0].donorAccountId, donation.grants[0].id)
                    }
                    else if (donation.donationType.abrv === 'session') {
                        this.routes.editSession(donation.sessions[0].id)
                    }
                    else if (donation.donationType.abrv === 'combined-grant') {
                        this.openCombinedGrantsModal(donation.grants)
                    }
                },
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (donation) => {
                    return donation.donationType.abrv === 'grant' || donation.donationType.abrv === 'session';
                },
                onReviewRender: (donation) => {
                    return donation.donationStatus.abrv === 'pending';
                }
            },
            selectionChange: this.selectionChange,
            selectedField: 'selected'

        }));
    }
}

export default DonationViewStore;

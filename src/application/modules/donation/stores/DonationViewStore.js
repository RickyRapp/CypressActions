export { default as DonationViewStore } from './DonationViewStore'; import { action } from 'mobx';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { DonationService } from 'application/donation/services';
import { applicationContext } from 'core/utils';
import { ModalParams } from 'core/models';
import { DonationListFilter } from 'application/donation/models';

@applicationContext
class DonationViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'donation',
            authorization: 'theDonorsFundDonationSection',
            routes: {
                edit: (id, grantId) =>
                    rootStore.routerStore.goTo(
                        'master.app.main.grant.edit',
                        {
                            id: id,
                            editId: grantId
                        }),
            },
            queryConfig: {
                filter: new DonationListFilter('dateCreated', 'desc')
            },
            actions: () => {
                const service = new DonationService(rootStore.application.baasic.apiClient);
                return {
                    find: async (params) => {
                        params.embed = [
                            'grants',
                            'grants.donorAccount',
                            'grants.donorAccount.coreUser',
                            'grants.donorAccount.companyProfile',
                            'charity',
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
                        const response = await service.find(params);
                        return response.data;
                    }
                }
            }
        });

        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'charity.name',
                    title: 'DONATION.LIST.COLUMNS.CHARITY_NAME_LABEL',
                },
                {
                    key: 'amount',
                    title: 'DONATION.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'donationStatus.name',
                    title: 'DONATION.LIST.COLUMNS.DONATION_STATUS_NAME_LABEL',
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
                onReview: (donation) => this.openReviewDonorModal(donation.id),
                onEdit: (donation) => this.routes.edit(donation.grants[0].donorAccountId, donation.grants[0].id),
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            },
            actionsRender: {
                onEditRender: (donation) => {
                    return donation.donationStatus.abrv === 'pending' && donation.donationType.abrv === 'grant';
                },
                onReviewRender: (donation) => {
                    return donation.donationStatus.abrv === 'pending';
                }
            }
        }));

        this.reviewModal = new ModalParams({});
    }

    @action.bound
    openReviewDonorModal(id) {
        this.reviewModal.open({
            id: id,
            onAfterReview: () => { this.reviewModal.close(); this.queryUtility.fetch(); }
        });
    }
}

export default DonationViewStore;

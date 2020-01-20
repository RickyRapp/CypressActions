import { TableViewStore, BaseListViewStore } from 'core/stores';
import { DonationService } from 'application/donation/services';
import { CharityProcessedDonationFilter } from 'application/donation/models';

class CharityProcessedDonationViewStore extends BaseListViewStore {
    constructor(rootStore) {
        let filter = new CharityProcessedDonationFilter();
        filter.donationStatusIds = rootStore.routerStore.routerState.queryParams.donationStatusIds;
        filter.charityId = rootStore.routerStore.routerState.queryParams.charityId;

        super(rootStore, {
            name: 'charity-processed-donations',
            authorization: 'theDonorsFundDonationSection',
            routes: {},
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
                            'donationType',
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
                    key: 'donationType.name',
                    title: 'DONATION.LIST.COLUMNS.DONATION_TYPE_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            if (item.donationType.abrv === 'combined-grant') {
                                return `${item.donationType.name} (${item.grants.length})`
                            }
                            else {
                                return item.donationType.name;
                            }
                        }
                    }
                },
                {
                    key: 'amount',
                    title: 'DONATION.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                }
            ],
            actions: {
                onSort: (column) => this.queryUtility.changeOrder(column.key)
            }
        }));
    }
}

export default CharityProcessedDonationViewStore;

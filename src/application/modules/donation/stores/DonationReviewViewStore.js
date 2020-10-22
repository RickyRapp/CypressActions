import { SelectTableWithRowDetailsViewStore, BaseListViewStore } from 'core/stores';
import { FilterParams } from 'core/models';
import { applicationContext } from 'core/utils';

@applicationContext
class DonationReviewViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'grant',
            authorization: 'theDonorsFundAdministrationSection',
            autoInit: false,
            routes: {},
            queryConfig: {
                filter: new FilterParams(),
                onResetFilter: () => { }
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [
                            'charity'
                        ];

                        return rootStore.application.donation.donationStore.findPendingDonation(params);
                    }
                }
            }
        });

        this.setTableStore(
            new SelectTableWithRowDetailsViewStore(
                this.queryUtility, {
                columns: [
                    {
                        key: 'charity.name',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.CHARITY_LABEL'
                    },
                    {
                        key: 'totalAmount',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.AMOUNT_LABEL',
                        format: {
                            type: 'currency',
                            value: '$'
                        },
                    },
                    {
                        key: 'online',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.ONLINE_LABEL'
                    },
                    {
                        key: 'charityWebsite',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.CHARITY_WEBSITE_LABEL'
                    },
                    {
                        key: 'grantRequest',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.GRANT_REQUEST_LABEL'
                    },
                    {
                        key: 'givingCard',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.GIVING_CARD_LABEL'
                    },
                    {
                        key: 'session',
                        title: 'DONATION.REVIEW.LIST.COLUMNS.SESSION_LABEL'
                    },
                ],
                actions: {}
            },
                true));
    }

    // @action.bound
    // async onInit() {
    //     this.queryUtility.fetch();
    // }

}

export default DonationReviewViewStore;

import { FilterParams } from 'core/models';
import { BaseListViewStore, TableViewStore } from 'core/stores';
import { applicationContext } from 'core/utils';
import { action } from 'mobx';

@applicationContext
class DonationLogViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'donation-log',
            authorization: 'theDonorsFundAdministrationSection',
            routes: {},
            actions: () => {
                return {
                    find: async () => {
                        return await rootStore.application.administration.donationStore.getDonationReviewLogs();
                    }
                }
            }
        });
        this.createTableStore();
        this.tableStore.dataInitialized = true;
    }

    @action.bound
    async onInit({ initialLoad }) {
        if (!initialLoad) {
            this.rootStore.routerStore.goBack();
        }
    }

    createTableStore() { 
        this.setTableStore(new TableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'isFinished',
                    title: 'DONATION_REVIEW.LIST.IS_FINISHED',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    }
                },
                {
                    key: 'userName',
                    title: 'DONATION_REVIEW.LIST.USER'
                },
                {
                    key: 'dateCreated',
                    title: 'DONATION_REVIEW.LIST.BEGINING'
                },
                {
                    key: 'finishTime',
                    title: 'DONATION_REVIEW.LIST.END',
                    format: {
                        type: 'date',
                        value: 'DD-MM-YYYY hh:mm:ss'
                    }
                },
            ],
            actions: {
            },
            actionsRender: {
            }
        }));
    }

}

export default DonationLogViewStore;

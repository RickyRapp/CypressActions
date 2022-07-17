import { saveAs } from '@progress/kendo-file-saver';
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

    @action.bound
    async printReport(donationLog) {
        let extension = 'pdf';
        let contentType = 'application/pdf';
        if (donationLog.paymentTypeAbrv === 'ach' || donationLog.paymentTypeAbrv === 'charity-account') {
            contentType = 'text/csv';
            extension = 'csv'
        }
        const paymentTypeId = donationLog.paymentTypeId;
        var ids = await this.rootStore.application.administration.donationStore.getCwtUsingDonationReviewLog(donationLog.id);
        const report = await this.rootStore.application.administration.reconcileStore.generateReport({ contentType, ids, paymentTypeId });
        const nowDate = new Date();
        const fileName = `${"Receipt".split(' ').join('_')}_${nowDate.getFullYear()}_${nowDate.getMonth()}_${nowDate.getDay()}_${nowDate.getHours()}_${nowDate.getMinutes()}_${nowDate.getSeconds()}_${nowDate.getMilliseconds()}.${extension}`;
        saveAs(report.data, fileName);
        this.rootStore.notificationStore.success("Report generated.");
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
                    title: 'DONATION_REVIEW.LIST.BEGINING',
                    format: {
                        type: 'date',
                        value: 'kendo-input-medium'
                    }
                },
                {
                    key: 'finishTime',
                    title: 'DONATION_REVIEW.LIST.END',
                    format: {
                        type: 'date',
                        value: 'kendo-input-medium'
                    }
                },
                {
                    key: 'paymentTypeAbrv',
                    title: 'Payment Type',
                    format: {
                        type: 'function',
                        value: (item) => {
                            switch(item.paymentTypeAbrv) {
                                case 'charity-account':
                                    return 'Charity account';
                                case 'ach':
                                    return 'ACH payment';
                                case 'check':
                                    return 'Check by mail';
                            }
                        }
                    }
                }
            ],
            actions: {
                onPrintReport: (item) => this.printReport(item)
            },
            actionsRender: {
                onPrintReportRender: (item) => {
                    return item.isFinished === true;
                }
            }
        }));
    }

}

export default DonationLogViewStore;

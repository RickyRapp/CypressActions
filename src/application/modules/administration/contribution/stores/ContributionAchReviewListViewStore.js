import { saveAs } from '@progress/kendo-file-saver';
import { ModalParams } from 'core/models';
import { TableViewStore, BaseListViewStore } from 'core/stores';
import { applicationContext, isSome } from 'core/utils';
import { action } from 'mobx';
import { ContributionReviewListFilter } from '../models';

@applicationContext
class ContributionAchReviewListViewStore extends BaseListViewStore {
    constructor(rootStore) {
        super(rootStore, {
            name: 'contribution-ach-review',
            routes: {},
            queryConfig: {
                filter: new ContributionReviewListFilter('dateCreated', 'desc')
            },
            actions: () => {
                return {
                    find: async (params) => {
                        params.embed = [];
                        return rootStore.application.administration.contributionStore.findContributionAchReviews(params);
                    }
                }
            }
        });

        this.createTableStore();
        this.tableStore.dataInitialized = true;
        this.previewModal = new ModalParams({});
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
                    key: 'achBatchNumber',
                    title: 'CONTRIBUTION.ACH_REVIEW.TABLE.ACH_BATCH_NUMBER'
                },
                {
                    key: 'dateCreated',
                    title: 'CONTRIBUTION.ACH_REVIEW.TABLE.DATE_CREATED',
                    format: {
                        type: 'date',
                        value: 'kendo-input-medium'
                    }
                },
                {
                    key: 'confirmationTime',
                    title: 'CONTRIBUTION.ACH_REVIEW.TABLE.CONFIRMATION_DATE',
                    format: {
                        type: 'date',
                        value: 'kendo-input-medium'
                    }
                },
                {
                    key: 'isConfirmed',
                    title: 'CONTRIBUTION.ACH_REVIEW.TABLE.IS_CONFIRMED',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    },
                    sortable: false
                },
                {
                    key: 'isValid',
                    title: 'CONTRIBUTION.ACH_REVIEW.TABLE.IS_VALID',
                    format: {
                        type: 'boolean',
                        value: 'yes-no'
                    },
                    sortable: false
                }
            ],
            actions: {
                onConfirm: (item) => this.confirmContribution(item),
                onPrintReport: (item) => this.printReport(item),
                onPreview: (item) => this.openPreviewModal(item),
            },
            actionsRender: {
                onConfirmRender: (item) => {
                    return item.isValid === true && item.isConfirmed === false;
                },
                onPrintReportRender: (item) => {
                    return item.isCashed !== false || item.isCashed !== null;
                },
                onPreviewRender: (item) => {
                    return item.isValid === true && item.isConfirmed == false;
                }
            }
        }));
    }

    @action.bound
    async confirmContribution(contributionReview){
        const id = contributionReview.id;
        await this.rootStore.application.administration.contributionStore.reviewBatchToProcess({ contributionReviewId: id });
        this.tableStore.resume();
        this.rootStore.notificationStore.success("Contribution statuses changed successfully.");
        this.queryUtility.fetch();
    }

    @action.bound
    async printReport(contributionReview){
        var response = await this.rootStore.application.administration.contributionStore.generateCsvContributionFile({contributionReviewId: contributionReview.id, contentType: 'text/csv' });
       
        const nowDate = new Date();
        const fileName = `${"Contribution".split(' ').join('_')}_${nowDate.getFullYear()}_${nowDate.getMonth()}_${nowDate.getDay()}_${nowDate.getHours()}_${nowDate.getMinutes()}_${nowDate.getSeconds()}_${nowDate.getMilliseconds()}.csv`;
        saveAs(response, fileName);
        this.rootStore.notificationStore.success("Contribution report generated.");
    }

    @action.bound
    openPreviewModal(content) {
        this.previewModal.open({
            content: content
        });
    }
}

export default ContributionAchReviewListViewStore;

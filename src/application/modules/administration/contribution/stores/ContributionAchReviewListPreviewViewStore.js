import { action, observable,reaction } from 'mobx';
import { BaseListViewStore, BaasicDropdownStore, DateRangeQueryPickerStore, SelectTableViewStore } from 'core/stores';
import { applicationContext, donorFormatter, isNullOrWhiteSpacesOrUndefinedOrEmpty } from 'core/utils';
import { ModalParams } from 'core/models';
import { ContributionListFilter , ContributionReviewListFilter} from 'application/administration/contribution/models';
import moment from 'moment';
import { saveAs } from '@progress/kendo-file-saver';
import { ContributionAchCreateForm } from '../forms';

@applicationContext
class ContributionAchReviewListPreviewViewStore extends BaseListViewStore {
    contributionStatuses = [];
    @observable selectedItemsSum = 0;
    @observable achBatchCurrentNumber = false;

    thirdPartyFunds = [
		{ id: '1', name: 'Fidelity Charitable' },
		{ id: '2', name: 'Schwab Charitable' },
		{ id: '3', name: 'JP Morgan Charitable Giving Fund' },
		{ id: '4', name: 'Vanguard Charitable Endowment Fund' },
		{ id: '5', name: 'Jewish Communal Fund' },
		{ id: '6', name: 'Goldman Sachs Philanthropy Fund' },
		{ id: '7', name: 'Greater Kansas City Community Foundation' },
		{ id: '8', name: 'The OJC Fund' },
		{ id: '9', name: 'Renaissance Charitable' },
		{ id: '10', name: 'National Philanthropic Trust' },
		{ id: '11', name: 'Jewish Federation of Metropolitan Chicago' },
		{ id: '12', name: 'Other' },
	];

    thirdPartyFunds = [
		{ id: '1', name: 'Fidelity Charitable' },
		{ id: '2', name: 'Schwab Charitable' },
		{ id: '3', name: 'JP Morgan Charitable Giving Fund' },
		{ id: '4', name: 'Vanguard Charitable Endowment Fund' },
		{ id: '5', name: 'Jewish Communal Fund' },
		{ id: '6', name: 'Goldman Sachs Philanthropy Fund' },
		{ id: '7', name: 'Greater Kansas City Community Foundation' },
		{ id: '8', name: 'The OJC Fund' },
		{ id: '9', name: 'Renaissance Charitable' },
		{ id: '10', name: 'National Philanthropic Trust' },
		{ id: '11', name: 'Jewish Federation of Metropolitan Chicago' },
		{ id: '12', name: 'Other' },
	];
    constructor(rootStore) {
        super(rootStore, {
            name: 'contribution-review-preview-list',
            authorization: 'theDonorsFundContributionSection',
            routes: {
               
            },
            queryConfig: {
                filter: new ContributionListFilter('dateCreated', 'desc')
            },
            actions: () => {
                return {
                    find: async (params) => {
                     
                        params.embed = [
                            'donor',
                            'payerInformation',
                            'bankAccount',
                            'paymentType',
                            'contributionStatus',
                            'bankAccount.accountHolder'
                        ];
                        params.contributionReviewId =  props.modalParams.data.content.id;
                        this.contributionReviewId = props.modalParams.data.content.id;
                        this.achBatchCurrentNumber = await rootStore.application.administration.contributionStore.achBatchCurrentNumber({ increment: false });
                        return  rootStore.application.administration.contributionStore.findContribution(params);
                    }
                }
            }
        });
        this.contributionReviewId;
        this.createTableStore();
        reaction(() => this.tableStore.dataInitialized, () => {
            this.tableStore.data.forEach(item => {
                this.tableStore.selectedItems.push(item);
            });
        });
      
    }



    createTableStore() {
        this.setTableStore(new SelectTableViewStore(this.queryUtility, {
            columns: [
                {
                    key: 'donor.donorName',
                    title: 'CONTRIBUTION.LIST.COLUMNS.DONOR_NAME_LABEL',
                    disableClick: true
                },
                {
                    key: 'amount',
                    title: 'CONTRIBUTION.LIST.COLUMNS.AMOUNT_LABEL',
                    format: {
                        type: 'currency',
                        value: '$'
                    }
                },
                {
                    key: 'confirmationNumber',
                    title: 'CONTRIBUTION.LIST.COLUMNS.CONFIRMATION_NUMBER_LABEL',
                },
                {
                    key: 'contributionStatus.name',
                    title: 'CONTRIBUTION.LIST.COLUMNS.CONTRIBUTION_STATUS_NAME_LABEL',
                },
                {
                    key: 'paymentType.name',
                    title: 'CONTRIBUTION.LIST.COLUMNS.PAYMENT_TYPE_NAME_LABEL',
                    format: {
                        type: 'function',
                        value: this.renderPaymentType
                    }
                },
                {
                    key: 'payerInformation.name',
                    title: 'CONTRIBUTION.LIST.COLUMNS.PAYER_INFORMATION_NAME_LABEL',
                    format: {
                        type: 'function',
                        value: (item) => {
                            return item.bankAccount && item.bankAccount.isThirdPartyAccount && item.bankAccount.accountHolder ? item.bankAccount.accountHolder.name : item.thirdPartyDonorAdvisedFundId && item.thirdPartyDonorAdvisedFundId != "" ? (this.thirdPartyFunds.find(c => c.id == item.thirdPartyDonorAdvisedFundId)).name : item.paymentType && item.paymentType.abrv == 'credit-card' ? 'PayPal Giving' : item.payerInformation.name;
                        }
                    }
                },
                {
                    key: 'checkNumber',
                    title: 'CONTRIBUTION.LIST.COLUMNS.PAYMENT_NUMBER_LABEL',
                },
                {
                    key: 'dateCreated',
                    title: 'CONTRIBUTION.LIST.COLUMNS.DATE_CREATED_LABEL',
                    format: {
                        type: 'date',
                        value: 'short'
                    }
                }
            ],
            actionsRender: {},
            disablePaging: true,
        }));
    }
 
    @action.bound
    async submitPending(){
        if(!this.form.values().paymentNumber){
            return;
        }
        let pendingDeposits = this.tableStore.selectedItems.filter(s => s.contributionStatus.abrv === 'pending' && s.paymentType.abrv === 'ach');
        let contributionReviewId = this.contributionReviewId;
        var response = await this.rootStore.application.administration.contributionStore.generateCsvContributionFile({ids: pendingDeposits.map(item => {return item.id}), achBatchNumber: this.form.values().paymentNumber, contributionReviewId: contributionReviewId, isPreview: true ,contentType: 'text/csv' });
       
        const nowDate = new Date();
        const fileName = `${"Contribution".split(' ').join('_')}_${nowDate.getFullYear()}_${nowDate.getMonth()}_${nowDate.getDay()}_${nowDate.getHours()}_${nowDate.getMinutes()}_${nowDate.getSeconds()}_${nowDate.getMilliseconds()}.csv`;
        saveAs(response, fileName);
        this.rootStore.notificationStore.success("Contribution report generated.");
    }

    @action.bound
    async onAchNextPaymentNumberClick() {
        this.achBatchCurrentNumber = await this.rootStore.application.administration.contributionStore.achBatchCurrentNumber({ increment: true });
        this.form.$('paymentNumber').set(this.achBatchCurrentNumber.toString());
    }

    @action.bound
    renderPaymentType(item) {
        if (item.paymentType.abrv === 'ach' || item.paymentType.abrv === 'wire-transfer') {
            if (item.bankAccount) {
                return `${item.paymentType.name}${' ...' + item.bankAccount.accountNumber}`;
            }
        }
        return item.paymentType.name;
    }
}

export default ContributionAchReviewListPreviewViewStore;
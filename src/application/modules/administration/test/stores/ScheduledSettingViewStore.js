import { TableViewStore, BaseViewStore } from 'core/stores';
import { AdministrationService } from 'application/administration/test/services';
import { applicationContext } from 'core/utils';

@applicationContext
class ScheduledSettingViewStore extends BaseViewStore {
    constructor(rootStore) {
        super(rootStore)
        this.service = new AdministrationService(rootStore.application.baasic.apiClient)
        this.routes = {}

        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'name',
                    title: 'TEST.SCHEDULED_SETTING.LIST.COLUMNS.NAME_LABEL'
                },
                {
                    key: 'description',
                    title: 'TEST.SCHEDULED_SETTING.LIST.COLUMNS.DESCRIPTION_LABEL'
                }
            ],
            actions: {
                onRun: async (task) => {
                    this.tableStore.suspend();
                    await this.service.runTask(task)
                    this.tableStore.resume();
                }
            }
        });

        const data = [
            {
                name: 'Contribution by contribution setting',
                description: 'Process contributions specified by contribution settings.',
                abrv: 'contribution-by-contribution-setting'
            },
            {
                name: 'Contribution in process review',
                description: 'Process contributions with status InProcess created 3 days ago.',
                abrv: 'contribution-in-process-review'
            },
            {
                name: 'Check scheduled grant insufficient funds',
                description: 'Process check scheduled grant insufficient funds.',
                abrv: 'check-scheduled-grant-insufficient-funds'
            },
            {
                name: 'Process grant scheduled payment',
                description: 'Process grant scheduled payment. Creates pending/approved grant.',
                abrv: 'process-grant-scheduled-payment'
            },
            {
                name: 'Contribution by automatic contribution setting',
                description: 'Process contributions specified by automatic contribution settings. Balance protection plan.',
                abrv: 'contribution-by-automatic-contribution-setting'
            },
            {
                name: 'Grant daily mark as cashed',
                description: 'Process grants in Processed status, that are not cashed, with ACH or Wire payment type and mark them as paid.',
                abrv: 'grant-daily-mark-as-cashed'
            },
            {
                name: 'Send low balance remainder',
                description: `Sends low balance remainder email to private donors which are not new (15 days or older), initial contribution 
                                must be done, at lease one contribution funded, low balance amount greater than present balance, day before 
                                present balance must be greater than low balance amount OR if we didn't sent notification already.`,
                abrv: 'process-low-balance-remainder'
            },
            {
                name: 'Process session pending certificates',
                description: `Process session pending certificates for donors who have enough funds on their account.`,
                abrv: 'session-pending-certificates'
            },
            {
                name: 'Process charity update file',
                description: `Downloads files from IRS (https://www.irs.gov/charities-non-profits/exempt-organizations-business-master-file-extract-eo-bmf) 
                                and import in temp table from which later will charities be imported/updated.`,
                abrv: 'charity-update-file'
            },
            {
                name: 'Process update charity with charity from file',
                description: `Updates/insert charities from temp table (charities from files)`,
                abrv: 'update-charity-with-charity-from-file'
            },
            {
                name: 'Process monthly grant fee',
                description: `Generates fee from Acumulated monthly grant fee`,
                abrv: 'monthly-grant-fee'
            },
            {
                name: 'Process auto-replenish amount increment',
                description: `Doubles the autoreplenish amount in case there are checks on hold for the donor`,
                abrv: 'autoreplenish-increase'
            },
            {
                name: 'Process auto-replenish with setting amount and checks on hold amount',
                description: `Creates a new auto-replenish contribution as a sum of the automatic contribution setting amount 
                and the total checks on hold amount for the donor`,
                abrv: 'autoreplenish-with-checks-on-hold'
            }
        ];

        this.tableStore.setData(data)
        if (!this.tableStore.dataInitialized) {
            this.tableStore.dataInitialized = true;
        }
    }
}

export default ScheduledSettingViewStore;

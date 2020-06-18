import { action } from 'mobx'
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
                onRun: (task) => this.runTask(task)
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
                name: 'Contribution by automatic contribution setting',
                description: 'Process contributions specified by automatic contribution settings. Low balance contribution.',
                abrv: 'contribution-by-automatic-contribution-setting'
            },
            {
                name: 'Charity subscription fee',
                description: 'Process charity subscription fee for regular and advanced charities (charities with enabled online account).',
                abrv: 'charity-subscription-fee'
            },
            {
                name: 'Grant daily mark as cashed',
                description: 'Process grants in Processed status, that are not cashed, with ACH or Wire payment type and mark them as paid.',
                abrv: 'grant-daily-mark-as-cashed'
            },
            {
                name: 'Send low balance remainder',
                description: `Sends low balance remainder email to premium donors which are not new (15 days or older), initial contribution 
                                must be done, at lease one contribution funded, low balance amount greater than present balance, day before 
                                present balance must be greater than low balance amount OR if we didn't sent notification already.`,
                abrv: 'process-low-balance-remainder'
            },
            {
                name: 'Process session pending certificates',
                description: `Process session pending certificates for donors who have enough funds on their account.`,
                abrv: 'session-pending-certificates'
            }
        ];

        this.tableStore.setData(data)
    }

    @action.bound
    async runTask(abrv) {
        this.tableStore.suspend();
        await this.service.runTask(abrv)
        this.tableStore.resume();
    }
}

export default ScheduledSettingViewStore;

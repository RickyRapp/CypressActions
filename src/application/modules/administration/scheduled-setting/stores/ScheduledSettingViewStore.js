import { action } from 'mobx'
import { TableViewStore, BaseViewStore } from 'core/stores';
import { ScheduledSettingService } from 'application/administration/scheduled-setting/services';
import { applicationContext } from 'core/utils';

@applicationContext
class ScheduledSettingViewStore extends BaseViewStore {
    constructor(rootStore) {
        super(rootStore)
        this.service = new ScheduledSettingService(rootStore.application.baasic.apiClient)
        this.routes = {}

        this.tableStore = new TableViewStore(null, {
            columns: [
                {
                    key: 'name',
                    title: 'SCHEDULED_SETTING.LIST.COLUMNS.NAME_LABEL'
                },
                {
                    key: 'description',
                    title: 'SCHEDULED_SETTING.LIST.COLUMNS.DESCRIPTION_LABEL'
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

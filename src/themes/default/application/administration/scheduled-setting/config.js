import { moduleProviderFactory } from 'core/providers';
import { ScheduledSettingList } from 'application/administration/scheduled-setting/pages';
import { noApplicationRedirectPromise } from 'core/utils';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.scheduled-setting',
                pattern: '/scheduled-settings',
                children: [
                    {
                        name: 'master.app.main.scheduled-setting.list',
                        pattern: '',
                        component: ScheduledSettingList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "SCHEDULED_SETTING.LIST.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.ADMINISTRATION',
                order: 1,
                authorization: 'theDonorsFundAdministrationSection.read',
                icon: 'administration',
                subMenu: [
                    {
                        title: 'MENU.SCHEDULED_SETTINGS',
                        order: 2,
                        icon: 'scheduled-setting icon',
                        route: 'master.app.main.scheduled-setting.list'
                    },
                ]
            }
        ]
    });
})();

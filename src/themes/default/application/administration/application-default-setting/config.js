import { moduleProviderFactory } from 'core/providers';
import { ApplicationDefaultSettingEdit } from 'application/administration/application-default-setting/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.application-default-setting',
                pattern: '/default-setting',
                children: [
                    {
                        name: 'master.app.main.application-default-setting.edit',
                        pattern: '',
                        component: ApplicationDefaultSettingEdit,
                        authorization: 'theDonorsFundAdministrationSection.update',
                        data: {
                            title: 'APPLICATION_DEFAULT_SETTING.EDIT.TITLE'
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.APPLICATION_DEFAULT_SETTING',
                icon: 'default-settings',
                order: 12,
                route: 'master.app.main.application-default-setting.edit',
                role: ['Administrators']
            },
        ]
    });
})();


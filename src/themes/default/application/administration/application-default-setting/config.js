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
                title: 'MENU.ADMINISTRATION',
                order: 1,
                authorization: 'theDonorsFundAdministrationSection.update',
                subMenu: [
                    {
                        title: 'MENU.APPLICATION_DEFAULT_SETTING',
                        order: 1,
                        route: 'master.app.main.application-default-setting.edit'
                    },
                ]
            }
        ]
    });
})();


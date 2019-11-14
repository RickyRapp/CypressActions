import { moduleProviderFactory } from 'core/providers';
import { ContributionSettingList, ContributionSettingCreate, ContributionSettingEdit } from 'application/contribution-setting/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.contribution-setting',
                pattern: '/contribution-settings',
                children: [
                    {
                        name: 'master.app.main.contribution-setting.list',
                        pattern: '',
                        component: ContributionSettingList,
                        authorization: 'theDonorsFundContributionSection.read',
                        data: {
                            title: "CONTRIBUTION_SETTING.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.contribution-setting.create',
                        pattern: '/create/:id',
                        component: ContributionSettingCreate,
                        authorization: 'theDonorsFundContributionSection.create',
                        data: {
                            title: "CONTRIBUTION_SETTING.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.contribution-setting.edit',
                        pattern: '/edit/:id/:editId',
                        component: ContributionSettingEdit,
                        authorization: 'theDonorsFundContributionSection.update',
                        data: {
                            title: "CONTRIBUTION_SETTING.EDIT.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.CONTRIBUTION',
                order: 4,
                authorization: 'theDonorsFundAdministrationSection.read',
                icon: 'contribution',
                subMenu: [
                    {
                        title: 'MENU.CONTRIBUTION_SETTINGS',
                        order: 3,
                        route: 'master.app.main.contribution-setting.list'
                    }
                ]
            },
            {
                title: 'MENU.CONTRIBUTION_SETTINGS',
                order: 5,
                route: 'master.app.main.contribution-setting.list',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('Users'); },
                icon: 'contribution-settings'
            },
        ]
    });
})();

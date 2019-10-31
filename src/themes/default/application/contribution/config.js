import { moduleProviderFactory } from 'core/providers';
import { ContributionList, ContributionCreate, ContributionEdit } from 'application/contribution/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.contribution',
                pattern: '/contributions',
                children: [
                    {
                        name: 'master.app.main.contribution.list',
                        pattern: '',
                        component: ContributionList,
                        authorization: 'theDonorsFundContributionSection.read',
                        data: {
                            title: "CONTRIBUTION.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.contribution.create',
                        pattern: '/create/:id',
                        component: ContributionCreate,
                        authorization: 'theDonorsFundContributionSection.create',
                        data: {
                            title: "CONTRIBUTION.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.contribution.edit',
                        pattern: '/edit/:id/:editId',
                        component: ContributionEdit,
                        authorization: 'theDonorsFundContributionSection.update',
                        data: {
                            title: "CONTRIBUTION.EDIT.TITLE"
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
                subMenu: [
                    {
                        title: 'MENU.CONTRIBUTIONS',
                        order: 1,
                        route: 'master.app.main.contribution.list'
                    }
                ]
            },
            {
                title: 'MENU.CONTRIBUTIONS',
                order: 5,
                route: 'master.app.main.contribution.list',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('Users'); },
                icon: 'contribution'
            },
        ]
    });
})();

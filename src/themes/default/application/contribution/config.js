import { moduleProviderFactory } from 'core/providers';
import { ContributionList, ContributionCreate, ContributionEdit, ContributionDetails } from 'application/contribution/pages';

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
                        pattern: '/create',
                        component: ContributionCreate,
                        authorization: 'theDonorsFundContributionSection.create',
                        data: {
                            title: "CONTRIBUTION.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.contribution.edit',
                        pattern: '/edit/:editId',
                        component: ContributionEdit,
                        authorization: 'theDonorsFundContributionSection.update',
                        data: {
                            title: "CONTRIBUTION.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.contribution.details',
                        pattern: '/details/:id',
                        component: ContributionDetails,
                        authorization: 'theDonorsFundContributionSection.read',
                        data: {
                            title: "CONTRIBUTION.DETAILS.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.CONTRIBUTIONS',
                order: 4,
                route: 'master.app.main.contribution.create',
                role: ['Users'],
                icon: 'contribution'
            },
            {
                title: 'MENU.CONTRIBUTIONS',
                order: 3,
                route: 'master.app.main.contribution.list',
                role: ['Administrators'],
                icon: 'contribution'
            }
        ]
    });
})();

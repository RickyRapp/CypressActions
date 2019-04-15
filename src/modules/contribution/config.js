import { moduleProviderFactory } from 'core/providers';
import { ContributionAdministrationList, ContributionMainList, ContributionCreate, ContributionEdit, ContributionDetails } from 'modules/contribution/pages'
import { ContributionSettingList } from 'modules/contribution-setting/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.contribution',
                pattern: 'contribution',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.administration.contribution.list',
                        pattern: '',
                        component: ContributionAdministrationList,
                    },
                    {
                        name: 'master.app.administration.contribution.create',
                        pattern: ':userId/create',
                        component: ContributionCreate,
                    },
                    {
                        name: 'master.app.administration.contribution.edit',
                        pattern: ':userId/edit/:id',
                        component: ContributionEdit,
                    },
                    {
                        name: 'master.app.administration.contribution.details',
                        pattern: ':id/details',
                        component: ContributionDetails,
                    },
                    {
                        name: 'master.app.administration.contribution.setting',
                        pattern: ':userId/setting',
                        component: ContributionSettingList,
                    }
                ]
            },
            {
                name: 'master.app.main.contribution',
                pattern: 'contribution',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.contribution.list',
                        pattern: '',
                        component: ContributionMainList,
                        authorization: 'theDonorsFundContributionSection.read',
                    },
                    {
                        name: 'master.app.main.contribution.create',
                        pattern: ':userId/create',
                        component: ContributionCreate,
                        authorization: 'theDonorsFundContributionSection.create'
                    },
                    {
                        name: 'master.app.main.contribution.edit',
                        pattern: ':id/edit',
                        component: ContributionEdit,
                        authorization: 'theDonorsFundContributionSection.update'
                    },
                    {
                        name: 'master.app.main.contribution.details',
                        pattern: ':id/details',
                        component: ContributionDetails,
                        authorization: 'theDonorsFundContributionSection.read'
                    },
                    {
                        name: 'master.app.main.contribution.setting',
                        pattern: ':userId/setting',
                        component: ContributionSettingList,
                        authorization: 'theDonorsFundContributionSection.update'
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Contributions',
                        route: 'master.app.main.contribution.list',
                        order: 2
                    },
                    {
                        title: 'Contributions',
                        route: 'master.app.administration.contribution.list',
                        order: 2
                    }
                ]
            }
        ]
    })
})();
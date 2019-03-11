import { moduleProviderFactory } from 'core/providers';
import { ContributionList, ContributionCreate, ContributionEdit } from 'modules/contribution/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.contribution',
                pattern: 'contribution',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.contribution.list',
                        pattern: '',
                        component: ContributionList,
                        authorization: 'theDonorsFundContributionSection.read'
                    },
                    {
                        name: 'master.app.main.contribution.create',
                        pattern: 'create/:id?',
                        component: ContributionCreate,
                        authorization: 'theDonorsFundContributionSection.create'
                    },
                    {
                        name: 'master.app.main.contribution.edit',
                        pattern: 'edit/:contributionId',
                        component: ContributionEdit,
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
                        order: 5
                    }
                ]
            }
        ]
    })
})();
import { moduleProviderFactory } from 'core/providers';
import { ContributionList, ContributionCreate, ContributionEdit, ContributionDetails } from 'modules/main/contribution/pages'
import { ContributionSettingList } from 'modules/main/contribution-setting/pages'

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
                        authorization: 'theDonorsFundContributionSection.read',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read',
                    },
                    {
                        name: 'master.app.main.contribution.create',
                        pattern: 'create',
                        component: ContributionCreate,
                        authorization: 'theDonorsFundContributionSection.create'
                    },
                    {
                        name: 'master.app.main.contribution.edit',
                        pattern: 'edit/:id',
                        component: ContributionEdit,
                        authorization: 'theDonorsFundContributionSection.update'
                    },
                    {
                        name: 'master.app.main.contribution.setting',
                        pattern: 'setting',
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
                    }
                ]
            }
        ]
    })
})();
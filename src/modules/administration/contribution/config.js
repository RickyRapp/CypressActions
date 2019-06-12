import { moduleProviderFactory } from 'core/providers';
import { ContributionList, ContributionCreate, ContributionEdit, ContributionDetails } from 'modules/administration/contribution/pages'
import { ContributionSettingList } from 'modules/administration/contribution-setting/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.contribution',
                pattern: 'contribution',
                children: [
                    {
                        name: 'master.app.administration.contribution.list',
                        pattern: '',
                        component: ContributionList,
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.administration.contribution.create',
                        pattern: ':userId/create',
                        component: ContributionCreate,
                        authorization: 'theDonorsFundAdministrationSection.create'
                    },
                    {
                        name: 'master.app.administration.contribution.edit',
                        pattern: ':userId/edit/:id',
                        component: ContributionEdit,
                        authorization: 'theDonorsFundAdministrationSection.update'
                    },
                    {
                        name: 'master.app.administration.contribution.setting',
                        pattern: ':userId/setting',
                        component: ContributionSettingList,
                        authorization: 'theDonorsFundAdministrationSection.read'
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
                        route: 'master.app.administration.contribution.list',
                        order: 2
                    }
                ]
            }
        ]
    })
})();
import { moduleProviderFactory } from 'core/providers';
import { ContributionList, ContributionCreate, ContributionEdit, ContributionDetails } from 'application/administration/contribution/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.contribution',
                pattern: '/contribution',
                children: [
                    {
                        name: 'master.app.main.administration.contribution.list',
                        pattern: '',
                        component: ContributionList,
                        data: {
                            title: "CONTRIBUTION.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.contribution.create',
                        pattern: '/create/:id',
                        component: ContributionCreate,
                        data: {
                            title: "CONTRIBUTION.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.contribution.edit',
                        pattern: '/edit/:id',
                        component: ContributionEdit,
                        data: {
                            title: "CONTRIBUTION.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.contribution.details',
                        pattern: '/details/:id',
                        component: ContributionDetails,
                        data: {
                            title: "CONTRIBUTION.DETAILS.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();

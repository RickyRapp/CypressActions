import { moduleProviderFactory } from 'core/providers';
import { ContributionCreate, ContributionEdit, ContributionDetails } from 'application/donor/contribution/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.contribution',
                pattern: '/contributions',
                children: [
                    {
                        name: 'master.app.main.donor.contribution.create',
                        pattern: '/create',
                        component: ContributionCreate,
                        authorization: 'theDonorsFundContributionSection.create',
                        data: {
                            title: "CONTRIBUTION.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donor.contribution.edit',
                        pattern: '/edit/:id',
                        component: ContributionEdit,
                        authorization: 'theDonorsFundContributionSection.update',
                        data: {
                            title: "CONTRIBUTION.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donor.contribution.details',
                        pattern: '/details/:id',
                        component: ContributionDetails,
                        authorization: 'theDonorsFundContributionSection.read',
                        data: {
                            title: "CONTRIBUTION.DETAILS.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();

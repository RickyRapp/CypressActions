import { moduleProviderFactory } from 'core/providers';
import { GrantDonorAccountCreate, GrantDonorAccountEdit } from 'modules/administration/grant-donor-account/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.grant-donor-account',
                pattern: '/grant-donor-account',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.administration.grant-donor-account.create',
                        pattern: ':userId/create',
                        component: GrantDonorAccountCreate,
                        authorization: 'theDonorsFundAdministrationSection.create'
                    },
                    {
                        name: 'master.app.administration.grant-donor-account.edit',
                        pattern: ':userId/edit/:id',
                        component: GrantDonorAccountEdit,
                        authorization: 'theDonorsFundAdministrationSection.update'
                    }
                ]
            }
        ]
    })
})();
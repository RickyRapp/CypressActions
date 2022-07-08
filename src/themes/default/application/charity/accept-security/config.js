import { moduleProviderFactory } from 'core/providers';
import { AcceptSecurityCreate, ContributionEdit, ContributionDetails } from 'application/charity/accept-security/pages';
import { DonorToDonorConfirmation } from 'application/donor/donor-donor/pages';


(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity.accept-security',
                pattern: '/accept-security', 
                children: [
                    {
                        name: 'master.app.main.charity.accept-security.create',
                        pattern: '/create',
                        component: AcceptSecurityCreate,
                        data: {
                            title: "Accept Stocks and Securities"
                        }
                    },
                    {
                        name: 'master.app.main.charity.accept-security.success',
                        pattern: '/success',
                        component: DonorToDonorConfirmation,
                        data: {
                            title: "DONOR-DONOR.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.charity.accept-security.edit',
                        pattern: '/edit/:id',
                        component: ContributionEdit,
                        authorization: 'theDonorsFundContributionSection.update',
                        data: {
                            title: "Edit"
                        }
                    },
                    {
                        name: 'master.app.main.charity.accept-security.details',
                        pattern: '/details/:id',
                        component: ContributionDetails,
                        authorization: 'theDonorsFundContributionSection.read',
                        data: {
                            title: "Details"
                        }
                    }
                ]
            }
        ]
    });
})();

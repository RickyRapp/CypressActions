import { moduleProviderFactory } from 'core/providers';
import { DonorToDonorTransaction, DonorToDonorListTransaction } from 'application/administration/donor-donor/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.donor-donor',
                pattern: '/donor-transaction',
                children: [
                    {
                        name: 'master.app.main.administration.donor-donor.list',
                        pattern: '',
                        component: DonorToDonorListTransaction,
                        data: {
                            title: "DONOR_DONOR_ADMIN.LIST.TITLE"
                        },
                    },
                    {
                        name: 'master.app.main.administration.donor-donor.template',
                        pattern: '/create',
                        component: DonorToDonorTransaction,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "DONOR_DONOR_ADMIN.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();

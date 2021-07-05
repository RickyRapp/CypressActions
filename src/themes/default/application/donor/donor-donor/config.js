import { moduleProviderFactory } from 'core/providers';
import { DonorToDonorCreate } from 'application/donor/donor-donor/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.donor-donor',
                pattern: '/transfers', 
                children: [
                    {
                        name: 'master.app.main.donor.donor-donor.create',
                        pattern: '/create',
                        component: DonorToDonorCreate,
                        authorization: 'theDonorsFundGrantSection.create',
                        data: {
                            title: "DONOR-DONOR.CREATE.TITLE"
                        }
                    },
                ]
            }
        ]
    });
})();

import { moduleProviderFactory } from 'core/providers';
import { DonorTab } from 'application/donor/donor/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.profile',
                pattern: '/profile',
                component: DonorTab,
                authorization: 'theDonorsFundDonorSection.update',
                data: {
                    title: "DONOR.EDIT.TITLE"
                }
            }
        ]
    });
})();

import { moduleProviderFactory } from 'core/providers';
import { CharityTab } from 'application/charity/charity/pages';
import { CharityModuleStore } from 'application/common/charity/stores';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity.bank-account-verification',
                pattern: '/verify',
                authorization: 'theDonorsFundCharitySection.create',
                component: CharityTab,
                data: {
                    title: "CHARITY.EDIT.TITLE"
                }
            }
        ]
    });
})();

import { moduleProviderFactory } from 'core/providers';
import { CharityVerification } from 'application/charity/charity/pages';
import { CharityModuleStore } from 'application/common/charity/stores';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity.bank-account-verification',
                pattern: '/verify',
                authorization: 'theDonorsFundCharitySection.create',
                component: CharityVerification
            }
        ],
        moduleStore: function (context) {
            return {
                'application.charity.verify': new CharityModuleStore(context.rootStore),
            };
        },
    });
})();

import { moduleProviderFactory } from 'core/providers';
import { CharityVerification } from 'application/charity/charity/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity.bank-account-verification',
                pattern: '/verify',
                authorization: '',
                component: CharityVerification
            }
        ]
    });
})();

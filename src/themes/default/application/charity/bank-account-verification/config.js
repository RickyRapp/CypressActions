import { moduleProviderFactory } from 'core/providers';
import { CharityVerification } from 'application/charity/charity/pages';
import { CharityModuleStore } from 'application/common/charity/stores';
import { CharityBankAccountList } from 'application/charity/charity/components';

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

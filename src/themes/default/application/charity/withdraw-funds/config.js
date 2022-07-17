import { moduleProviderFactory } from 'core/providers';
import { CharityWithdrawFunds } from 'application/charity/withdraw-funds/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity.withdraw',
                pattern: '/withdraw-funds',
                component: CharityWithdrawFunds,
                authorization: 'theDonorsFundCharitySection.read',
                data: {
                    title: "CHARITY_WITHDRAW.TAB_TITLE"
                }
            }
        ]
    });
})();

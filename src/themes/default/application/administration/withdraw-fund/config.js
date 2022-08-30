import { WithdrawFundCreate, WithdrawFundList } from 'application/administration/withdraw-fund/pages';
import { moduleProviderFactory } from 'core/providers';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.withdraw',
                pattern: '/withdraw',
                children: [
                    {
                        name: 'master.app.main.administration.withdraw.list',
                        pattern: '',
                        component: WithdrawFundList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: 'WITHDRAW_FUNDS.LIST.TITLE'
                        }
                    },
                    {
                        name: 'master.app.main.administration.withdraw.create',
                        pattern: '/create',
                        component: WithdrawFundCreate,
                        authorization: 'theDonorsFundAdministrationSection.create',
                        data: {
                            title: 'WITHDRAW_FUNDS.LIST.TITLE'
                        }
                    }
                ]
            }
        ]
    });
})();

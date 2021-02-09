import { moduleProviderFactory } from 'core/providers';
import { InvestmentPoolList } from 'application/administration/investment/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.investment',
                pattern: '/investments',
                children: [
                    {
                        name: 'master.app.main.administration.investment.list',
                        pattern: '',
                        component: InvestmentPoolList,
                        data: {
                            title: "INVESTMENT_POOL.LIST.TITLE"
                        }
                    },
                ]
            }
        ]
    });
})();

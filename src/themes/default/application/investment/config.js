import { moduleProviderFactory } from 'core/providers';
import { InvestmentPoolList } from 'application/investment/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.investment',
                pattern: '/investments',
                children: [
                    {
                        name: 'master.app.main.investment.list',
                        pattern: '',
                        component: InvestmentPoolList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "INVESTMENT_POOL.LIST.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.INVESTMENT',
                order: 4,
                role: ['Administrators'],
                route: 'master.app.main.investment.list'
            }
        ]
    });
})();

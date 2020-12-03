import { moduleProviderFactory } from 'core/providers';
import { InvestmentPoolList, DonorInvestmentList, DonorInvestmentCreate } from 'application/investment/pages';
import { InvestmentModuleStore } from 'application/investment/stores';
import { RouterState } from 'mobx-state-router';

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
                    },
                    {
                        name: 'master.app.main.investment.donor',
                        pattern: '/list',
                        component: DonorInvestmentList,
                        authorization: 'theDonorsFundDonorSection.read',
                        data: {
                            title: "DONOR_INVESTMENT.LIST.TITLE"
                        },
                        // eslint-disable-next-line
                        beforeEnter: async (fromState, toState, routerStore) => {
                            const { investment: { investmentStore } } = routerStore.rootStore.application;

                            let donorId = routerStore.rootStore.userStore.user.id;
                            const hasInvestments = await investmentStore.hasInvestments(donorId);
                            if (hasInvestments) {
                                return Promise.resolve();
                            }
                            else {
                                return Promise.reject(new RouterState('master.app.main.investment.create'));
                            }
                        },
                    },
                    {
                        name: 'master.app.main.investment.create',
                        pattern: '/create',
                        component: DonorInvestmentCreate,
                        authorization: 'theDonorsFundDonorSection.create',
                        data: {
                            title: "DONOR_INVESTMENT.CREATE.TITLE"
                        },
                        // eslint-disable-next-line
                        beforeEnter: async (fromState, toState, routerStore) => {
                            const { investment: { investmentStore } } = routerStore.rootStore.application;

                            let donorId = routerStore.rootStore.userStore.user.id;
                            const hasInvestments = await investmentStore.hasInvestments(donorId);
                            if (hasInvestments) {
                                return Promise.reject(new RouterState('master.app.main.investment.donor'));
                            }
                            else {
                                return Promise.resolve();
                            }
                        },
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.INVESTMENTS',
                icon: 'investment',
                order: 4,
                role: ['Administrators'],
                route: 'master.app.main.investment.list'
            }
        ],
        moduleStore: function (context) {
            return {
                'application.investment': new InvestmentModuleStore(context.rootStore),
            };
        },
    });
})();

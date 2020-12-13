import { moduleProviderFactory } from 'core/providers';
import { DonorInvestmentList, DonorInvestmentCreate } from 'application/donor/investment/pages';
import { RouterState } from 'mobx-state-router';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.investment',
                pattern: '/investments',
                children: [
                    {
                        name: 'master.app.main.donor.investment.donor',
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
                                return Promise.reject(new RouterState('master.app.main.donor.investment.create'));
                            }
                        },
                    },
                    {
                        name: 'master.app.main.donor.investment.create',
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
                                return Promise.reject(new RouterState('master.app.main.donor.investment.donor'));
                            }
                            else {
                                return Promise.resolve();
                            }
                        },
                    }
                ]
            }
        ]
    });
})();

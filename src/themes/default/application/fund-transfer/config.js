import { moduleProviderFactory } from 'core/providers';
import { FundTransferList, FundTransferCreate } from 'application/fund-transfer/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.fund-transfer',
                pattern: '/fund-transfers',
                children: [
                    {
                        name: 'master.app.main.fund-transfer.list',
                        pattern: '',
                        component: FundTransferList,
                        authorization: 'theDonorsFundContributionSection.read',
                        data: {
                            title: "FUND_TRANSFER.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.fund-transfer.create',
                        pattern: '/create',
                        component: FundTransferCreate,
                        authorization: 'theDonorsFundAdministrationSection.create',
                        data: {
                            title: "FUND_TRANSFER.CREATE.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.FUND_TRANSFER',
                order: 5,
                authorization: 'theDonorsFundAdministrationSection.read',
                route: 'master.app.main.fund-transfer.list'
            },
            {
                title: 'MENU.FUND_TRANSFERS',
                order: 6,
                route: 'master.app.main.fund-transfer.list',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser && rootStore.userStore.user.roles.includes('Users'); },
                icon: 'fund-transfer'
            },
        ]
    });
})();

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
                        authorization: 'theDonorsFundAdministrationSection.read',
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
                title: 'MENU.FUND_TRANSFERS',
                role: ['Administrators'],
                icon: 'transfer',
                order: 7,
                route: 'master.app.main.fund-transfer.list'
            },
        ]
    });
})();

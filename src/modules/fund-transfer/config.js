import { moduleProviderFactory } from 'core/providers';
import { FundTransferCreate, FundTransferList } from 'modules/fund-transfer/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.fund.transfer',
                pattern: '/fund-transfer',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.fund.transfer.list',
                        pattern: 'list/:id?',
                        component: FundTransferList,
                        authorization: 'theDonorsFundContributionSection.read'
                    },
                    {
                        name: 'master.app.main.fund.transfer.create',
                        pattern: 'create',
                        component: FundTransferCreate,
                        authorization: 'theDonorsFundSection.create'

                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Fund Transfers',
                        route: 'master.app.main.fund.transfer.list',
                        order: 3
                    }
                ]
            }
        ]
    })
})();
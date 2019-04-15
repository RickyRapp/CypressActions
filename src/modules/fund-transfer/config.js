import { moduleProviderFactory } from 'core/providers';
import { FundTransferCreate, FundTransferList } from 'modules/fund-transfer/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.fund.transfer',
                pattern: '/fund-transfer',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.administration.fund.transfer.list',
                        pattern: '',
                        component: FundTransferList,
                    },
                    {
                        name: 'master.app.administration.fund.transfer.create',
                        pattern: 'create',
                        component: FundTransferCreate,
                        authorization: 'theDonorsFundSection.create'

                    }
                ]
            },
            {
                name: 'master.app.main.fund.transfer',
                pattern: '/fund-transfer',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.fund.transfer.list',
                        pattern: '',
                        component: FundTransferList,
                        authorization: 'theDonorsFundContributionSection.read'
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
                        order: 4
                    },
                    {
                        title: 'Fund Transfers',
                        route: 'master.app.administration.fund.transfer.list',
                        order: 4
                    }
                ]
            }
        ]
    })
})();
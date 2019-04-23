import { moduleProviderFactory } from 'core/providers';
import { FundTransferList } from 'modules/main/fund-transfer/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.fund-transfer',
                pattern: '/fund-transfer',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.fund-transfer.list',
                        pattern: '',
                        component: FundTransferList,
                        authorization: 'theDonorsFundContributionSection.read',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read',
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
                        route: 'master.app.main.fund-transfer.list',
                        order: 4
                    }
                ]
            }
        ]
    })
})();
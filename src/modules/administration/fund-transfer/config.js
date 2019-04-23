import { moduleProviderFactory } from 'core/providers';
import { FundTransferCreate, FundTransferList } from 'modules/administration/fund-transfer/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.fund-transfer',
                pattern: '/fund-transfer',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.administration.fund-transfer.list',
                        pattern: '',
                        component: FundTransferList,
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.administration.fund-transfer.create',
                        pattern: 'create',
                        component: FundTransferCreate,
                        authorization: 'theDonorsFundSection.create',
                        authorization: 'theDonorsFundAdministrationSection.create'

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
                        route: 'master.app.administration.fund-transfer.list',
                        order: 4
                    }
                ]
            }
        ]
    })
})();
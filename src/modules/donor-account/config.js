import { MainLayout } from 'core/layouts';
import { moduleProviderFactory } from 'core/providers';
import { DonorAccountList, DonorAccountEdit } from 'modules/donor-account/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor-account',
                pattern: '/donor-account',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.donor-account.list',
                        pattern: '',
                        component: DonorAccountList
                    },
                    {
                        name: 'master.app.main.donor-account.edit',
                        pattern: 'edit/:id?',
                        component: DonorAccountEdit
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Donors',
                        route: 'master.app.main.donor-account.list',
                        order: 3
                    }
                ]
            }
        ]
    })
})();
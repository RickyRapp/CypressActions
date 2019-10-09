import { moduleProviderFactory } from 'core/providers';
import { DonorAccountList, DonorAccountEdit, DonorAccountCreate } from 'application/donor-account/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor-account',
                pattern: '/donor-accounts',
                children: [
                    {
                        name: 'master.app.main.donor-account.list',
                        pattern: '',
                        component: DonorAccountList,
                        authorization: 'theDonorsFundDonorSection.read',
                        data: {
                            title: "DONORACCOUNT.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donor-account.edit',
                        pattern: '/edit/:id',
                        component: DonorAccountEdit,
                        authorization: 'theDonorsFundDonorSection.update',
                        data: {
                            title: "DONORACCOUNT.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donor-account.create',
                        pattern: '/create',
                        component: DonorAccountCreate,
                        authorization: 'theDonorsFundDonorSection.create',
                        data: {
                            title: "DONORACCOUNT.CREATE.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Administration',
                icon: 'test icon for administration',
                subMenu: [
                    {
                        title: 'MENU.DONORACCOUNTS',
                        order: 1,
                        icon: 'donor account icon',
                        route: 'master.app.main.donor-account.list'
                    },
                ]
            }
        ]
    });
})();

import { moduleProviderFactory } from 'core/providers';
import { BankTab } from 'application/administration/bank/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.bank',
                pattern: '/bank',
                children: [
                    {
                        name: 'master.app.main.bank.tab',
                        pattern: '',
                        component: BankTab,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "BANK.LIST.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.ADMINISTRATION',
                order: 1,
                authorization: 'theDonorsFundAdministrationSection.update',
                icon: 'administration',
                subMenu: [
                    {
                        title: 'MENU.BANKS',
                        order: 7,
                        route: 'master.app.main.bank.tab',
                    }
                ]
            }
        ]
    });
})();

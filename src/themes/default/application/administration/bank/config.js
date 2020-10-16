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
                title: 'MENU.BANKS',
                order: 11,
                route: 'master.app.main.bank.tab',
                role: ['Administrators']
            }
        ]

    });
})();

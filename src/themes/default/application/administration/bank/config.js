import { moduleProviderFactory } from 'core/providers';
import { BankTab } from 'application/administration/bank/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.bank',
                pattern: '/bank',
                children: [
                    {
                        name: 'master.app.main.administration.bank.tab',
                        pattern: '',
                        component: BankTab,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "BANK.LIST.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();

import { moduleProviderFactory } from 'core/providers';
import { CreditDebitList, CreditDebitCreate } from 'application/administration/credit-debit/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.credit-debit',
                pattern: '/credit-debits',
                children: [
                    {
                        name: 'master.app.main.administration.credit-debit.list',
                        pattern: '',
                        component: CreditDebitList,
                        authorization: 'theDonorsFundCreditDebitSection.read',
                        data: {
                            title: "CREDIT_DEBIT.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.credit-debit.create',
                        pattern: '/create/:id',
                        component: CreditDebitCreate,
                        authorization: 'theDonorsFundCreditDebitSection.create',
                        data: {
                            title: "CREDIT_DEBIT.CREATE.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();

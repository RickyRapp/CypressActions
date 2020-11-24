import { moduleProviderFactory } from 'core/providers';
import { ReconcileList } from 'application/administration/reconcile/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.reconcile',
                pattern: '/reconcile',
                children: [
                    {
                        name: 'master.app.main.reconcile.check.list',
                        pattern: 'reconcile',
                        component: ReconcileList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: 'RECONCILE.LIST.TITLE'
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.RECONCILE',
                icon: 'reconcile',
                order: 9,
                route: 'master.app.main.reconcile.check.list',
                role: ['Administrators']
            }
        ]
    });
})();

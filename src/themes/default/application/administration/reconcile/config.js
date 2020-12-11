import { moduleProviderFactory } from 'core/providers';
import { ReconcileList } from 'application/administration/reconcile/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.reconcile',
                pattern: '/reconcile',
                children: [
                    {
                        name: 'master.app.main.administration.reconcile.list',
                        pattern: '',
                        component: ReconcileList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: 'RECONCILE.LIST.TITLE'
                        }
                    }
                ]
            }
        ]
    });
})();

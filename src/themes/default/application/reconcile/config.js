import { moduleProviderFactory } from 'core/providers';
import { CheckList } from 'application/reconcile/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.reconcile',
                pattern: '/reconcile',
                children: [
                    {
                        name: 'master.app.main.reconcile.check.list',
                        pattern: 'checks',
                        component: CheckList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: 'RECONCILE.CHECK.LIST.TITLE'
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.RECONCILE',
                order: 7,
                authorization: 'theDonorsFundAdministrationSection.read',
                icon: 'check',
                subMenu: [
                    {
                        title: 'MENU.CHECKS',
                        order: 1,
                        route: 'master.app.main.reconcile.check.list'
                    }
                ]
            }
        ]
    });
})();

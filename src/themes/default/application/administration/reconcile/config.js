import { moduleProviderFactory } from 'core/providers';
import { CheckList } from 'application/administration/reconcile/pages';

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
                title: 'MENU.ADMINISTRATION',
                order: 1,
                authorization: 'theDonorsFundAdministrationSection.update',
                icon: 'administration',
                subMenu: [
                    {
                        title: 'MENU.CHECKS',
                        order: 6,
                        route: 'master.app.main.reconcile.check.list'
                    }
                ]
            }
        ]
    });
})();

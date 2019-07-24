import { moduleProviderFactory } from 'core/providers';
import { BookletList, BookletCreate, BookletDetails, BookletInventory } from 'modules/administration/booklet/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.booklet',
                pattern: 'booklet',
                children: [
                    {
                        name: 'master.app.administration.booklet.list',
                        pattern: '',
                        component: BookletList,
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.administration.booklet.create',
                        pattern: 'create',
                        component: BookletCreate,
                        authorization: 'theDonorsFundAdministrationSection.create'
                    },
                    {
                        name: 'master.app.administration.booklet.details',
                        pattern: 'details/:id',
                        component: BookletDetails,
                        authorization: 'theDonorsFundAdministrationSection.update'
                    },
                    {
                        name: 'master.app.administration.booklet.inventory',
                        pattern: 'inventory',
                        component: BookletInventory,
                        authorization: 'theDonorsFundAdministrationSection.read'
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Booklets',
                        route: 'master.app.administration.booklet.list',
                        order: 2
                    }
                ]
            }
        ]
    })
})();
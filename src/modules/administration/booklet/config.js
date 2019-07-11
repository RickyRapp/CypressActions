import { moduleProviderFactory } from 'core/providers';
import { BookletList, BookletCreate } from 'modules/administration/booklet/pages'

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
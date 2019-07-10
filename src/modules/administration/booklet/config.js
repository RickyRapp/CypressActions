import { moduleProviderFactory } from 'core/providers';
import { BookletList } from 'modules/administration/booklet/pages'

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
import { moduleProviderFactory } from 'core/providers';
import { BookletTab, BookletCreate, BookletEdit } from 'application/booklet/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.booklet',
                pattern: '/booklets',
                children: [
                    {
                        name: 'master.app.main.booklet.tab',
                        pattern: '',
                        component: BookletTab,
                        authorization: 'theDonorsFundBookletSection.read',
                        data: {
                            title: "BOOKLET.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.booklet.edit',
                        pattern: '/edit/:id',
                        component: BookletEdit,
                        authorization: 'theDonorsFundAdministrationSection.update',
                        data: {
                            title: "BOOKLET.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.booklet.create',
                        pattern: '/create',
                        component: BookletCreate,
                        authorization: 'theDonorsFundBookletSection.create',
                        data: {
                            title: "BOOKLET.CREATE.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            // {
            //     title: 'MENU.BOOKLET',
            //     authorization: 'theDonorsFundBookletSection.read',
            //     order: 3,
            //     icon: 'booklet',
            //     route: 'master.app.main.booklet.tab'
            // }
        ]
    });
})();

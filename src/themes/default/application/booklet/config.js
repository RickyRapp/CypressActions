import { moduleProviderFactory } from 'core/providers';
import { BookletList, BookletCreate, BookletEdit } from 'application/booklet/pages';
import { BookletModuleStore } from 'application/booklet/stores';

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
                        component: BookletList,
                        authorization: 'theDonorsFundBookletSection.read',
                        data: {
                            title: "BOOKLET.LIST.TITLE"
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
                    },
                    {
                        name: 'master.app.main.booklet.edit',
                        pattern: '/edit/:id',
                        component: BookletEdit,
                        authorization: 'theDonorsFundAdministrationSection.update',
                        data: {
                            title: "BOOKLET.EDIT.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.BOOKLET',
                role: ['Administrators'],
                order: 3,
                icon: 'booklet',
                route: 'master.app.main.booklet.tab'
            }
        ],
        moduleStore: function (context) {
            return {
                'application.booklet': new BookletModuleStore(context.rootStore),
            };
        },
    });
})();

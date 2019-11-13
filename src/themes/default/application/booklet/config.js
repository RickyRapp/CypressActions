import { moduleProviderFactory } from 'core/providers';
import { BookletList, BookletCreate, BookletEdit } from 'application/booklet/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.booklet',
                pattern: '/booklets',
                children: [
                    {
                        name: 'master.app.main.booklet.list',
                        pattern: '',
                        component: BookletList,
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
            {
                title: 'MENU.BOOKLET',
                authorization: 'theDonorsFundAdministrationSection.read',
                order: 3,
                icon: 'booklet',
                subMenu: [
                    {
                        title: 'MENU.BOOKLETS',
                        order: 2,
                        route: 'master.app.main.booklet.list'
                    },
                ]
            },
            {
                title: 'MENU.BOOKLETS',
                route: 'master.app.main.booklet.list',
                order: 2,
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('Users'); },
                icon: 'booklet'
            },
        ]
    });
})();

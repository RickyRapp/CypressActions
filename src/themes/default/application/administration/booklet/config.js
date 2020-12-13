import { moduleProviderFactory } from 'core/providers';
import { BookletList, BookletCreate, BookletEdit } from 'application/administration/booklet/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.booklet',
                pattern: '/booklets',
                children: [
                    {
                        name: 'master.app.main.administration.booklet.list',
                        pattern: '',
                        component: BookletList,
                        authorization: 'theDonorsFundBookletSection.read',
                        data: {
                            title: "BOOKLET.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.booklet.create',
                        pattern: '/create',
                        component: BookletCreate,
                        authorization: 'theDonorsFundBookletSection.create',
                        data: {
                            title: "BOOKLET.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.booklet.edit',
                        pattern: '/edit/:id',
                        component: BookletEdit,
                        authorization: 'theDonorsFundBookletSection.update',
                        data: {
                            title: "BOOKLET.EDIT.TITLE"
                        }
                    }
                ]
            }
        ],
    });
})();

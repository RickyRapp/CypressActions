import { moduleProviderFactory } from 'core/providers';
import { BookletOrderList, BookletOrderCreate, BookletOrderEdit } from 'modules/main/booklet-order/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.booklet-order',
                pattern: 'booklet-order',
                children: [
                    {
                        name: 'master.app.main.booklet-order.list',
                        pattern: '',
                        component: BookletOrderList,
                        authorization: 'theDonorsFundBookletOrderSection.read',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.main.booklet-order.create',
                        pattern: 'create',
                        component: BookletOrderCreate,
                        authorization: 'theDonorsFundBookletOrderSection.create',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.main.booklet-order.edit',
                        pattern: 'edit/:id',
                        component: BookletOrderEdit,
                        authorization: 'theDonorsFundBookletOrderSection.update',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read'
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Booklet Orders',
                        route: 'master.app.main.booklet-order.list',
                        order: 2
                    }
                ]
            }
        ]
    })
})();
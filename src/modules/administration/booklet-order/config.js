import { moduleProviderFactory } from 'core/providers';
import { BookletOrderList, BookletOrderCreate, BookletOrderEdit } from 'modules/administration/booklet-order/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.booklet-order',
                pattern: 'booklet-order',
                children: [
                    {
                        name: 'master.app.administration.booklet-order.list',
                        pattern: '',
                        component: BookletOrderList,
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.administration.booklet-order.create',
                        pattern: ':userId/create',
                        component: BookletOrderCreate,
                        authorization: 'theDonorsFundAdministrationSection.create'
                    },
                    {
                        name: 'master.app.administration.booklet-order.edit',
                        pattern: ':userId/edit/:id',
                        component: BookletOrderEdit,
                        authorization: 'theDonorsFundAdministrationSection.update'
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
                        route: 'master.app.administration.booklet-order.list',
                        order: 2
                    }
                ]
            }
        ]
    })
})();
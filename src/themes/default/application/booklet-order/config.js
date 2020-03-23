import { moduleProviderFactory } from 'core/providers';
import { BookletOrderList, BookletOrderCreate, BookletOrderEdit, BookletOrderReview } from 'application/booklet-order/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.booklet-order',
                pattern: '/booklet-orders',
                children: [
                    {
                        name: 'master.app.main.booklet-order.list',
                        pattern: '',
                        component: BookletOrderList,
                        authorization: 'theDonorsFundBookletOrderSection.read',
                        data: {
                            title: "BOOKLET_ORDER.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.booklet-order.edit',
                        pattern: '/edit/:id/:editId',
                        component: BookletOrderEdit,
                        authorization: 'theDonorsFundBookletOrderSection.update',
                        data: {
                            title: "BOOKLET_ORDER.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.booklet-order.create',
                        pattern: '/create/:id',
                        component: BookletOrderCreate,
                        authorization: 'theDonorsFundBookletOrderSection.create',
                        data: {
                            title: "BOOKLET_ORDER.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.booklet-order.review',
                        pattern: '/review/:id',
                        component: BookletOrderReview,
                        authorization: 'theDonorsFundBookletOrderSection.review',
                        data: {
                            title: "BOOKLET_ORDER.REVIEW.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: []
    });
})();

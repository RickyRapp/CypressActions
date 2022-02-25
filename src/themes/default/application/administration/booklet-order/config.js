import { moduleProviderFactory } from 'core/providers';
import { BookletOrderList, BookletOrderCreate, BookletOrderReview, BookletOrderPreview, BookletOrderEdit } from 'application/administration/booklet-order/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.booklet-order',
                pattern: '/booklet-orders',
                children: [
                    {
                        name: 'master.app.main.administration.booklet-order.list',
                        pattern: '',
                        component: BookletOrderList,
                        authorization: 'theDonorsFundBookletOrderSection.read',
                        data: {
                            title: "BOOKLET_ORDER.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.booklet-order.create',
                        pattern: '/create/:id',
                        component: BookletOrderCreate,
                        authorization: 'theDonorsFundBookletOrderSection.create',
                        data: {
                            title: "BOOKLET_ORDER.CREATE.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.booklet-order.review',
                        pattern: '/review/:id',
                        component: BookletOrderReview,
                        authorization: 'theDonorsFundBookletOrderSection.update',
                        data: {
                            title: "BOOKLET_ORDER.REVIEW.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.booklet-order.details',
                        pattern: '/details/:id',
                        component: BookletOrderPreview,
                        authorization: 'theDonorsFundBookletOrderSection.read',
                        data: {
                            title: "BOOKLET_ORDER.PREVIEW.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.booklet-order.edit',
                        pattern: '/edit/:id',
                        component: BookletOrderEdit,
                        authorization: 'theDonorsFundBookletOrderSection.update',
                        data: {
                            title: "BOOKLET_ORDER.EDIT.TITLE_TEMPLATE"
                        }
                    }
                ]
            }
        ]
    });
})();

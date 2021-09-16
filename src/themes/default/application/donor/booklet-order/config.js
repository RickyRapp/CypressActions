import { moduleProviderFactory } from 'core/providers';
import { BookletOrderList, BookletOrderCreate } from 'application/donor/booklet-order/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor.booklet-order',
                pattern: '/booklet-orders',
                children: [
                    {
                        name: 'master.app.main.donor.booklet-order.list',
                        pattern: '',
                        component: BookletOrderList,
                        authorization: 'theDonorsFundBookletOrderSection.read',
                        data: {
                            title: "BOOKLET_ORDER.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donor.booklet-order.create',
                        pattern: '/create',
                        component: BookletOrderCreate,
                        authorization: 'theDonorsFundBookletOrderSection.create',
                        data: {
                            title: "BOOKLET_ORDER.CREATE.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();

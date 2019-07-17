import { moduleProviderFactory } from 'core/providers';
import { BookletOrderList, BookletOrderCreate } from 'modules/main/booklet-order/pages'
// BookletOrderEdit

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
                        authorization: 'theDonorsFundDonorSection.read',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.main.booklet-order.create',
                        pattern: 'create',
                        component: BookletOrderCreate,
                        authorization: 'theDonorsFundDonorSection.create',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read'
                    },
                    // {
                    //     name: 'master.app.administration.booklet-order.edit',
                    //     pattern: 'edit/:id',
                    //     component: ContributionEdit,
                    //     authorization: 'theDonorsFundAdministrationSection.update'
                    // }
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
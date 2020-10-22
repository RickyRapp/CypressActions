import { moduleProviderFactory } from 'core/providers';
import { DonorList, DonorTab, DonorCreate } from 'application/donor/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor',
                pattern: '/donors',
                children: [
                    {
                        name: 'master.app.main.donor.list',
                        pattern: '',
                        component: DonorList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "DONOR.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donor.edit',
                        pattern: '/edit/:id',
                        component: DonorTab,
                        authorization: 'theDonorsFundDonorSection.update',
                        data: {
                            title: "DONOR.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donor.create',
                        pattern: '/create',
                        component: DonorCreate,
                        authorization: 'theDonorsFundAdministrationSection.create',
                        data: {
                            title: "DONOR.CREATE.TITLE"
                        }
                    }
                ]
            },
            {
                name: 'master.app.main.profile',
                pattern: '/profile',
                component: DonorTab,
                role: ['Users'],
                data: {
                    title: "DONOR.EDIT.TITLE"
                }
            },
        ],
        menu: [
            {
                title: 'MENU.DONORS',
                order: 5,
                role: ['Administrators'],
                route: 'master.app.main.donor.list',
            },

        ]
    });
})();

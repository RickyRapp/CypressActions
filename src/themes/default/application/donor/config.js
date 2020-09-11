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
                pattern: '/profile/:id',
                component: DonorTab,
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser && rootStore.userStore.user.roles.includes('Users'); },
                data: {
                    title: "DONOR.EDIT.TITLE"
                },
                beforeEnter: function (fromState, toState, routerStore) {
                    toState.params.id = routerStore.rootStore.userStore.applicationUser.id
                    return Promise.resolve();
                }
            },
        ],
        menu: [
            // {
            //     title: 'MENU.DONORS',
            //     order: 3,
            //     authorization: 'theDonorsFundAdministrationSection.read',
            //     route: 'master.app.main.donor.list',
            //     icon: 'donors'
            // },
            {
                title: 'MENU.MANAGE_FUND',
                order: 5,
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser && rootStore.userStore.user.roles.includes('Users'); },
                icon: 'administration',
                subMenu: [
                    {
                        title: 'MENU.PROFILE_SETTING',
                        order: 1,
                        route: 'master.app.main.profile'
                    },
                ]
            },
        ]
    });
})();

import { moduleProviderFactory } from 'core/providers';
import { DonorAccountList, DonorAccountEdit, DonorAccountCreate } from 'application/donor-account/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.donor-account',
                pattern: '/donor-accounts',
                children: [
                    {
                        name: 'master.app.main.donor-account.list',
                        pattern: '',
                        component: DonorAccountList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "DONORACCOUNT.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donor-account.edit',
                        pattern: '/edit/:id',
                        component: DonorAccountEdit,
                        authorization: 'theDonorsFundDonorSection.update',
                        data: {
                            title: "DONORACCOUNT.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.donor-account.create',
                        pattern: '/create',
                        component: DonorAccountCreate,
                        authorization: 'theDonorsFundAdministrationSection.create',
                        data: {
                            title: "DONORACCOUNT.CREATE.TITLE"
                        }
                    }
                ]
            },
            {
                name: 'master.app.main.profile',
                pattern: '/profile/:id',
                component: DonorAccountEdit,
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('Users'); },
                data: {
                    title: "DONORACCOUNT.EDIT.TITLE"
                },
                beforeEnter: function (fromState, toState, routerStore) {
                    toState.params.id = routerStore.rootStore.userStore.applicationUser.id
                    return Promise.resolve();
                }
            },
        ],
        menu: [
            {
                title: 'MENU.ADMINISTRATION',
                authorization: 'theDonorsFundAdministrationSection.read',
                subMenu: [
                    {
                        title: 'MENU.DONOR_ACCOUNTS',
                        order: 1,
                        route: 'master.app.main.donor-account.list'
                    }
                ]
            },
            {
                title: 'MENU.DONOR_ACCOUNT_EDIT',
                route: 'master.app.main.profile',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('Users'); },
                icon: 'profile'
            },
        ]
    });
})();

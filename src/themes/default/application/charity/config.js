import { moduleProviderFactory } from 'core/providers';
import { CharityList, CharityCreate, CharityTab, CharityGrantsList, CharityCertificatesList, CharityGrantRequestList } from 'application/charity/pages';
import { CharityService } from 'application/charity/services';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity',
                pattern: '/charity',
                children: [
                    {
                        name: 'master.app.main.charity.list',
                        pattern: '',
                        component: CharityList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "CHARITY.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.charity.edit',
                        pattern: '/edit/:id',
                        component: CharityTab,
                        authorization: 'theDonorsFundAdministrationSection.update',
                        data: {
                            title: "CHARITY.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.charity.create',
                        pattern: '/create',
                        component: CharityCreate,
                        authorization: 'theDonorsFundAdministrationSection.create',
                        data: {
                            title: "CHARITY.CREATE.TITLE"
                        }
                    }
                ]
            },
            {
                name: 'master.app.main.charity-profile',
                pattern: '/charity-profile/:id',
                component: CharityTab,
                role: ['CharitiesRegular', 'CharitiesAdvanced'],
                data: {
                    title: "CHARITY.EDIT.TITLE"
                },
                beforeEnter: async (fromState, toState, routerStore) => {
                    const userId = routerStore.rootStore.userStore.user.id;
                    const service = new CharityService(routerStore.rootStore.application.baasic.apiClient);
                    const response = await service.get(userId, { fields: ['id'] });
                    if (response.statusCode === 200) {
                        toState.params.id = response.data.id;
                        return Promise.resolve();
                    }
                    else {
                        return Promise.reject(fromState);
                    }
                }
            },
            {
                name: 'master.app.main.charity-grants',
                pattern: '/charity-grants',
                component: CharityGrantsList,
                role: ['CharitiesRegular', 'CharitiesAdvanced'],
                data: {
                    title: "CHARITY_GRANTS.LIST.TITLE"
                }
            },
            {
                name: 'master.app.main.charity-grant-requests',
                pattern: '/charity-grant-requests/:id',
                component: CharityGrantRequestList,
                role: ['CharitiesRegular', 'CharitiesAdvanced'],
                data: {
                    title: "CHARITY_GRANT_REQUESTS.LIST.TITLE"
                },
                beforeEnter: async (fromState, toState, routerStore) => {
                    const userId = routerStore.rootStore.userStore.user.id;
                    const service = new CharityService(routerStore.rootStore.application.baasic.apiClient);
                    const response = await service.get(userId, { fields: ['id'] });
                    if (response.statusCode === 200) {
                        toState.params.id = response.data.id;
                        return Promise.resolve();
                    }
                    else {
                        return Promise.reject(fromState);
                    }
                }
            },
            {
                name: 'master.app.main.charity-certificates',
                pattern: '/charity-certificates',
                component: CharityCertificatesList,
                role: ['CharitiesRegular', 'CharitiesAdvanced'],
                data: {
                    title: "CHARITY_CERTIFICATES.LIST.TITLE"
                }
            }
        ],
        menu: [
            {
                title: 'MENU.MANAGE_CHARITY_ACCOUNT',
                order: 5,
                role: ['CharitiesRegular', 'CharitiesAdvanced'],
                icon: 'profile',
                subMenu: [
                    {
                        title: 'MENU.PROFILE_SETTING',
                        order: 1,
                        route: 'master.app.main.charity-profile',
                    },
                ]
            },
            {
                title: 'MENU.CHARITY_GRANT_REQUESTS',
                order: 3,
                route: 'master.app.main.charity-grant-requests',
                role: ['CharitiesRegular', 'CharitiesAdvanced'],
                icon: 'grant'
            }
        ]
    });
})();

import { moduleProviderFactory } from 'core/providers';
import { CharityList, CharityCreate, CharityTab, CharityUpdateFile, CharityGrantsList, CharityCertificatesList } from 'application/charity/pages';
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
                    },
                    {
                        name: 'master.app.main.charity.update-file',
                        pattern: '/update-file',
                        component: CharityUpdateFile,
                        authorization: 'theDonorsFundAdministrationSection.create',
                        data: {
                            title: "CHARITY.UPDATE_FILE.TITLE"
                        }
                    }
                ]
            },
            {
                name: 'master.app.main.charity-profile',
                pattern: '/charity-profile/:id',
                component: CharityTab,
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.some(c => ['CharitiesRegular', 'CharitiesAdvanced'].includes(c)) },
                data: {
                    title: "CHARITY.EDIT.TITLE"
                },
                beforeEnter: async (fromState, toState, routerStore) => {
                    const userId = routerStore.rootStore.userStore.applicationUser.id;
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
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.some(c => ['CharitiesRegular', 'CharitiesAdvanced'].includes(c)) },
                data: {
                    title: "CHARITY_GRANTS.LIST.TITLE"
                }
            },
            {
                name: 'master.app.main.charity-certificates',
                pattern: '/charity-certificates',
                component: CharityCertificatesList,
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.some(c => ['CharitiesRegular', 'CharitiesAdvanced'].includes(c)) },
                data: {
                    title: "CHARITY_CERTIFICATES.LIST.TITLE"
                }
            }
        ],
        menu: [
            {
                title: 'MENU.CHARITIES',
                authorization: 'theDonorsFundAdministrationSection.read',
                order: 4,
                route: 'master.app.main.charity.list',
                icon: 'charities',
            },
            {
                title: 'MENU.CHARITY_EDIT',
                order: 5,
                route: 'master.app.main.charity-profile',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.some(c => ['CharitiesRegular', 'CharitiesAdvanced'].includes(c)) },
                icon: 'profile'
            },
            {
                title: 'MENU.CHARITY_GRANTS',
                order: 6,
                route: 'master.app.main.charity-grants',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.some(c => ['CharitiesRegular', 'CharitiesAdvanced'].includes(c)) },
                icon: 'grant'
            },
            {
                title: 'MENU.CHARITY_CERTIFICATES',
                order: 7,
                route: 'master.app.main.charity-certificates',
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.some(c => ['CharitiesRegular', 'CharitiesAdvanced'].includes(c)) },
                icon: 'grant'
            },
        ]
    });
})();

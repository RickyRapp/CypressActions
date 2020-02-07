import { moduleProviderFactory } from 'core/providers';
import { CharityList, CharityCreate, CharityEdit, CharityUpdateFile } from 'application/charity/pages';
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
                        component: CharityEdit,
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
                pattern: '/profile/:id',
                component: CharityEdit,
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('CharitiesRegular', 'CharitiesAdvanced'); },
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
                authorization: (route, rootStore) => { return rootStore.userStore.applicationUser.roles.includes('CharitiesRegular', 'CharitiesAdvanced'); },
                icon: 'profile'
            },
        ]
    });
})();

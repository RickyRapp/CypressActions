import { moduleProviderFactory } from 'core/providers';
import { CharityList, CharityCreate, CharityTab } from 'application/charity/pages';
import { CharityModuleStore } from 'application/charity/stores';

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
            }
        ],
        menu: [
            {
                title: 'MENU.CHARITIES',
                order: 6,
                route: 'master.app.main.charity.list',
                role: ['Administrators']
            }
        ],
        moduleStore: function (context) {
            return {
                'application.charity': new CharityModuleStore(context.rootStore),
            };
        },
    });
})();

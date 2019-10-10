import { moduleProviderFactory } from 'core/providers';
import { CharityList, CharityCreate, CharityEdit } from 'application/charity/pages';

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
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.ADMINISTRATION',
                authorization: 'theDonorsFundAdministrationSection.read',
                subMenu: [
                    {
                        title: 'MENU.CHARITIES',
                        order: 1,
                        route: 'master.app.main.charity.list'
                    },
                ]
            }
        ]
    });
})();

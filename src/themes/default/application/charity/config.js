import { moduleProviderFactory } from 'core/providers';
import { CharityList, CharityCreate, CharityEdit, CharityUpdateFile } from 'application/charity/pages';

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
            }
        ],
        menu: [
            {
                title: 'MENU.CHARITIES',
                authorization: 'theDonorsFundAdministrationSection.read',
                order: 4,
                route: 'master.app.main.charity.list',
                icon: 'charities',
            }
        ]
    });
})();

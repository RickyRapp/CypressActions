import { moduleProviderFactory } from 'core/providers';
import { CharityCreate, CharityList, CharityEdit, CharityFiles } from 'modules/administration/charity/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.charity',
                pattern: 'charity',
                children: [
                    {
                        name: 'master.app.administration.charity.list',
                        pattern: '',
                        component: CharityList,
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                    {
                        name: 'master.app.administration.charity.create',
                        pattern: 'create',
                        component: CharityCreate,
                        authorization: 'theDonorsFundAdministrationSection.create'
                    },
                    {
                        name: 'master.app.administration.charity.edit',
                        pattern: ':userId/edit',
                        component: CharityEdit,
                        authorization: 'theDonorsFundAdministrationSection.edit'
                    },
                    {
                        name: 'master.app.administration.charity.files',
                        pattern: ':userId/files',
                        component: CharityFiles,
                        authorization: 'theDonorsFundAdministrationSection.edit'
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Charities',
                        route: 'master.app.administration.charity.list',
                        order: 2
                    }
                ]
            }
        ]
    })
})();
import { moduleProviderFactory } from 'core/providers';
import { CharityListTab, CharityCreate, CharityTab, CharityPendingTab } from 'application/administration/charity/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.charity',
                pattern: '/charity',
                children: [
                    {
                        name: 'master.app.main.administration.charity.list',
                        pattern: '',
                        component: CharityListTab,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "CHARITY.LIST.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.charity.edit',
                        pattern: '/edit/:id',
                        component: CharityTab,
                        authorization: 'theDonorsFundAdministrationSection.update',
                        data: {
                            title: "CHARITY.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.charity.edit.pending',
                        pattern: '/edit/pending/:id',
                        component: CharityPendingTab,
                        authorization: 'theDonorsFundAdministrationSection.update',
                        data: {
                            title: "CHARITY.EDIT.TITLE"
                        }
                    },
                    {
                        name: 'master.app.main.administration.charity.create',
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
    });
})();

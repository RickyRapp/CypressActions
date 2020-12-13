import { moduleProviderFactory } from 'core/providers';
import { DonorTab, DonorList } from 'application/administration/donor/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.donor',
                pattern: '/donor',
                children: [
                    {
                        name: 'master.app.main.administration.donor.list',
                        pattern: '',
                        component: DonorList,
                        data: {
                            title: "DONOR.LIST.TITLE"
                        },
                    },
                    {
                        name: 'master.app.main.administration.donor.edit',
                        pattern: '/edit/:id',
                        component: DonorTab,
                        data: {
                            title: "DONOR.EDIT.TITLE"
                        },
                    }
                ]
            }
        ]
    });
})();

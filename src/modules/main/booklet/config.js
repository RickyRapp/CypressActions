import { moduleProviderFactory } from 'core/providers';
import { BookletList } from 'modules/main/booklet/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.booklet',
                pattern: 'booklet',
                children: [
                    {
                        name: 'master.app.main.booklet.list',
                        pattern: '',
                        component: BookletList,
                        authorization: 'theDonorsFundDonorSection.read',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read',
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Booklets',
                        route: 'master.app.main.booklet.list',
                        order: 2
                    }
                ]
            }
        ]
    })
})();
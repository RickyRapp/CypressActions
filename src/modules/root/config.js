import { moduleProviderFactory } from 'core/providers';
import { Overview } from 'modules/root/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.home',
                pattern: '',
                isPrivate: true,
                component: Overview,
                authorization: 'theDonorsFundSection.read'
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [
                    {
                        title: 'Home',
                        route: 'master.app.main.home',
                        order: 4
                    }
                ]
            }
        ]
    })
})();
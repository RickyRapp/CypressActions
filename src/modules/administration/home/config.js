import { moduleProviderFactory } from 'core/providers';
import { Home } from 'modules/administration/home/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.administration.home',
                pattern: '/',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.administration.home.overview',
                        pattern: 'home',
                        component: Home,
                        authorization: 'theDonorsFundAdministrationSection.read'
                    },
                ]
            }
        ],
        menu: [
            {
                title: 'Application',
                icon: 'cog',
                subMenu: [
                    {
                        title: 'Home',
                        route: 'master.app.administration.home.overview',
                        order: 6
                    }
                ]
            }
        ]
    });
})();

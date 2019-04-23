import { moduleProviderFactory } from 'core/providers';
import { Home } from 'modules/main/home/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.home',
                pattern: '/',
                isPrivate: true,
                children: [
                    {
                        name: 'master.app.main.home.overview',
                        pattern: 'home',
                        component: Home,
                        authorization: 'theDonorsFundDonorSection.read',
                        withoutAuthorization: 'theDonorsFundAdministrationSection.read',
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
                        route: 'master.app.main.home.overview',
                        order: 6
                    }
                ]
            }
        ]
    });
})();

import { moduleProviderFactory } from 'core/providers';
import { Overview } from 'modules/root/pages'

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.home.entry',
                pattern: 'home',
                isPrivate: true,
                component: Overview,
            }
        ],
        menu: [
            {
                title: 'Application',
                subMenu: [

                    {
                        title: 'Home',
                        route: 'master.app.home.entry',
                        order: 7
                    }
                ]
            }
        ]
    })
})();
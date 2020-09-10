import { moduleProviderFactory } from 'core/providers';
import { Home, Register } from 'application/public/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.public.home', //Entry point, home page
                pattern: '',
                isPublic: true,
                component: Home
            },
            {
                name: 'master.app.public.register',
                pattern: '/register',
                isPublic: true,
                component: Register
            }
        ],
        menu: [
        ]
    });
})();

import { moduleProviderFactory } from 'core/providers';
import { Home, Register, WhatWeOffer, Daf101, Company } from 'application/public/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.public.main.home', //Entry point, home page
                pattern: '',
                isPublic: true,
                component: Home
            },
            {
                name: 'master.public.main.what-we-offer',
                pattern: '/what-we-offer',
                isPublic: true,
                component: WhatWeOffer
            },
            {
                name: 'master.public.main.daf-101',
                pattern: '/daf-101',
                isPublic: true,
                component: Daf101
            },
            {
                name: 'master.public.main.company',
                pattern: '/company',
                isPublic: true,
                component: Company
            },

            {
                name: 'master.public.main.register',
                pattern: '/register',
                isPublic: true,
                component: Register
            }
        ],
        menu: [
        ]
    });
})();

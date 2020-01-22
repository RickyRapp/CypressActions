import { moduleProviderFactory } from 'core/providers';
import { ThirdPartyWebsiteList } from 'application/third-party-website/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.third-party-website',
                pattern: '/third-party-websites',
                children: [
                    {
                        name: 'master.app.main.third-party-website.list',
                        pattern: '',
                        component: ThirdPartyWebsiteList,
                        authorization: 'theDonorsFundSessionSection.read',
                        data: {
                            title: "THIRD_PARTY_WEBSITE.LIST.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.THIRD_PARTY_WEBSITE',
                order: 11,
                authorization: 'theDonorsFundAdministrationSection.read',
                icon: 'third-party-website',
                route: 'master.app.main.third-party-website.list'
            }
        ]
    });
})();

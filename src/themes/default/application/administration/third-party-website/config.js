import { moduleProviderFactory } from 'core/providers';
import { ThirdPartyWebsiteList } from 'application/administration/third-party-website/pages';

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
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "THIRD_PARTY_WEBSITE.LIST.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.ADMINISTRATION',
                order: 9,
                authorization: 'theDonorsFundAdministrationSection.update',
                icon: 'administration',
                subMenu: [
                    {
                        title: 'MENU.THIRD_PARTY_WEBSITE',
                        order: 5,
                        route: 'master.app.main.third-party-website.list'
                    }
                ]
            }
        ]
    });
})();

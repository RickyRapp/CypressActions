import { moduleProviderFactory } from 'core/providers';
import { CharityWebsiteTab } from 'application/administration/charity-website/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.charity-website',
                pattern: '/charity-websites',
                children: [
                    {
                        name: 'master.app.main.administration.charity-website.tab',
                        pattern: '',
                        component: CharityWebsiteTab,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "CHARITY_WEBSITE.LIST.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();

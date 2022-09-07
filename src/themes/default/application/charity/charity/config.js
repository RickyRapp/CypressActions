import { moduleProviderFactory } from 'core/providers';
import { CharityTab } from 'application/charity/charity/pages';
import { CharityModuleStore } from 'application/common/charity/stores';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity.profile',
                pattern: '/profile',
                authorization: 'theDonorsFundCharitySection.read',
                component: CharityTab,
                data: {
                    // title: "CHARITY.EDIT.TITLE"
                }
            }
        ],
        moduleStore: function (context) {
            return {
                'application.charity.charity': new CharityModuleStore(context.rootStore),
            };
        },
    });
})();

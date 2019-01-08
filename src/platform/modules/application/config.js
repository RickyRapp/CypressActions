import { moduleProviderFactory } from 'core/providers';
import { ApplicationList } from 'platform/modules/application/pages';
import { ApplicationModuleStore } from 'platform/modules/application/stores';
import { getDefaultStoreKey } from 'core/utils';

(function () {
    moduleProviderFactory.platform.register({
        routes: [
            {
                name: 'master.platform.main.application',
                pattern: '/applications',
                isPrivate: true,
                children: [
                    {
                        name: 'master.platform.main.application.list',
                        pattern: '',
                        component: ApplicationList
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'Platform',
                icon: 'common-file-text',
                subMenu: [
                    {
                        description: "Applications",
                        title: "Applications",
                        route: "master.platform.main.application.list",
                        order: 12
                    }
                ]
            }
        ],
        storeFactory: function (context) {
            return {
                "platform.application": new ApplicationModuleStore(context.rootStore),
            }
        },
    });
})();


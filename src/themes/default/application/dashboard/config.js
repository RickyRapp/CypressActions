import { moduleProviderFactory } from 'core/providers';

import {Home} from 'application/dashboard/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.dashboard',
                pattern: '',
                component: Home,
            },            
        ]
    });
})();

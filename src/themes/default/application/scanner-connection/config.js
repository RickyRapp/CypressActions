import { moduleProviderFactory } from 'core/providers';
import { ScannerConnectionList } from 'application/scanner-connection/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.scanner-connection',
                pattern: '/scanner-connections',
                children: [
                    {
                        name: 'master.app.main.scanner-connection.list',
                        pattern: '',
                        component: ScannerConnectionList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "SCANNER_CONNECTION.LIST.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.SESSION',
                order: 8,
                authorization: 'theDonorsFundAdministrationSection.read',
                subMenu: [
                    {
                        title: 'MENU.SCANNER_CONNECTIONS',
                        order: 3,
                        route: 'master.app.main.scanner-connection.list'
                    }
                ]
            }
        ]
    });
})();

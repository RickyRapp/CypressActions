import { moduleProviderFactory } from 'core/providers';
import { ScannerConfig, Scanning } from 'modules/administration/scanner/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.scanner.info',
                pattern: '',
                children: [
                    {
                        name: 'master.app.scanner.info.start',
                        pattern: '',
                        component: Scanning,
                        authorization: 'theDonorsFundScannerSection.update'
                    },
                    {
                        name: 'master.app.scanner.info.config',
                        pattern: 'config',
                        component: ScannerConfig,
                        authorization: 'theDonorsFundScannerSection.update'
                    }
                ]
            }
        ]
    });
})();

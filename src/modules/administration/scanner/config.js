import { moduleProviderFactory } from 'core/providers';
import { PublicLayout } from 'core/layouts';
import { ScannerConfig } from 'modules/administration/scanner/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.scan.scanner',
                pattern: 'scanner/',
                isPrivate: true,
                component: [PublicLayout],
                children: [
                    {
                        name: 'master.scan.scanner.config',
                        pattern: 'config',
                        component: ScannerConfig,
                        authorization: 'theDonorsFundScannerSection.update'
                    },
                ]
            }
        ]
    });
})();

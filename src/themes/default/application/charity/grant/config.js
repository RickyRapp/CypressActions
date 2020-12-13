import { moduleProviderFactory } from 'core/providers';
import { GrantRequest } from 'application/charity/grant/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity.grant-request',
                pattern: '/grant-request',
                children: [
                    {
                        name: 'master.app.main.charity.grant-request.create',
                        pattern: '',
                        component: GrantRequest,
                        authorization: 'theDonorsFundCharitySection.update',
                        data: {
                            title: "GRANT_REQUEST.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();

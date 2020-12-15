import { moduleProviderFactory } from 'core/providers';
import { GrantGivingCardCreate, GrantRequest } from 'application/charity/grant/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.charity.giving-card',
                pattern: '/giving-card',
                children: [
                    {
                        name: 'master.app.main.charity.giving-card.create',
                        pattern: '',
                        component: GrantGivingCardCreate,
                        authorization: 'theDonorsFundCharitySection.update',
                        data: {
                            title: "CHARITY_GIVING_CARD.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();

import { moduleProviderFactory } from 'core/providers';
import { GivingCardList } from 'application/administration/giving-card/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.administration.giving-card',
                pattern: '/giving-card',
                children: [
                    {
                        name: 'master.app.main.administration.giving-card.list',
                        pattern: '',
                        component: GivingCardList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "GIVING_CARD.LIST.TITLE"
                        }
                    }
                ]
            }
        ]
    });
})();

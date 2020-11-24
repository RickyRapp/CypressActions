import { moduleProviderFactory } from 'core/providers';
import { FidelityRecommendationCardList } from 'application/administration/fidelity-recommendation-card/pages';

(function () {
    moduleProviderFactory.application.register({
        routes: [
            {
                name: 'master.app.main.fidelity-recommendation-card',
                pattern: '/fidelity-recommendation-card',
                children: [
                    {
                        name: 'master.app.main.fidelity-recommendation-card.list',
                        pattern: '',
                        component: FidelityRecommendationCardList,
                        authorization: 'theDonorsFundAdministrationSection.read',
                        data: {
                            title: "FIDELITY_RECOMMENDATION_CARD.LIST.TITLE"
                        }
                    }
                ]
            }
        ],
        menu: [
            {
                title: 'MENU.FIDELITY_RECOMMENDATION_CARDS',
                icon: 'fidelity-cards',
                order: 10,
                route: 'master.app.main.fidelity-recommendation-card.list',
                role: ['Administrators']
            }
        ]
    });
})();

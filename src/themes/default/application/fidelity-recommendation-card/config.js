import { moduleProviderFactory } from 'core/providers';
import { FidelityRecommendationCardList } from 'application/fidelity-recommendation-card/pages';
import _ from 'lodash'

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
                authorization: 'theDonorsFundAdministrationSection.read',
                order: 6,
                route: 'master.app.main.fidelity-recommendation-card.list',
                icon: 'fidelity-recommendation-cards'
            }
        ]
    });
})();

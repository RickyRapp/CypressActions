import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { FidelityRecommendationCardListTemplate } from 'themes/application/administration/fidelity-recommendation-card/pages';
import { FidelityRecommendationCardViewStore } from 'application/administration/fidelity-recommendation-card/stores';

@setCurrentView((rootStore) => new FidelityRecommendationCardViewStore(rootStore), 'fidelityRecommendationCardViewStore')
@observer
class FidelityRecommendationCardList extends React.Component {
    render() {
        return <FidelityRecommendationCardListTemplate {...this.props} />
    }
}

export default FidelityRecommendationCardList;

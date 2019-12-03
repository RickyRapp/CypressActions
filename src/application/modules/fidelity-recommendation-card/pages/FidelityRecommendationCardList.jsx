import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { FidelityRecommendationCardListTemplate } from 'themes/application/fidelity-recommendation-card/pages';
import { FidelityRecommendationCardViewStore } from 'application/fidelity-recommendation-card/stores';

@setCurrentView((rootStore) => new FidelityRecommendationCardViewStore(rootStore), 'fidelityRecommendationCardViewStore')
@observer
class FidelityRecommendationCardList extends React.Component {
    render() {
        return <FidelityRecommendationCardListTemplate {...this.props} />
    }
}

export default FidelityRecommendationCardList;

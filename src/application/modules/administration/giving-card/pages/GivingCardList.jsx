import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GivingCardListTemplate } from 'themes/application/administration/giving-card/pages';
import { GivingCardViewStore } from 'application/administration/giving-card/stores';

@setCurrentView((rootStore) => new GivingCardViewStore(rootStore), 'givingCardViewStore')
@observer
class GivingCardList extends React.Component {
    render() {
        return <GivingCardListTemplate {...this.props} />
    }
}

export default GivingCardList;

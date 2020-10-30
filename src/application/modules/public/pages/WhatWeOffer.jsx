import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { WhatWeOfferTemplate } from 'themes/application/public/pages';
import { WhatWeOfferViewStore } from 'application/public/stores';

@setCurrentView((rootStore) => new WhatWeOfferViewStore(rootStore), 'whatWeOfferViewStore')
@observer
class WhatWeOffer extends React.Component {
    render() {
        return <WhatWeOfferTemplate {...this.props} />
    }
}

export default WhatWeOffer;

import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityPaymentOptionsTemplate } from 'themes/application/administration/charity/components';
import { CharityPaymentOptionsViewStore } from '../stores';

@setCurrentView((rootStore) => new CharityPaymentOptionsViewStore(rootStore), 'charityPaymentOptionsViewStore')
@observer
class CharityPaymentOptions extends React.Component {
    render() {
        return <CharityPaymentOptionsTemplate {...this.props} />
    }
}

export default CharityPaymentOptions;
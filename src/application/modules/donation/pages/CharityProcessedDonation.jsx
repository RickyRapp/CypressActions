import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityProcessedDonationTemplate } from 'themes/application/donation/pages';
import { CharityProcessedDonationViewStore } from 'application/donation/stores';

@setCurrentView((rootStore) => new CharityProcessedDonationViewStore(rootStore), 'charityProcessedDonationViewStore')
@observer
class CharityProcessedDonation extends React.Component {
    render() {
        return <CharityProcessedDonationTemplate {...this.props} />
    }
}

export default CharityProcessedDonation;

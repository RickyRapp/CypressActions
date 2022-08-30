import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityVerificationTabTemplate } from 'themes/application/charity/bank-account-verification/components';
import { CharityVerificationTabViewStore } from '../stores';

@setCurrentView((rootStore) => new CharityVerificationTabViewStore(rootStore), 'charityVerificationTabViewStore')
@observer
class CharityVerificationTab extends React.Component {
    render() {
        return <CharityVerificationTabTemplate {...this.props} />
    }
}

export default CharityVerificationTab;

import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityVerificationViewStore } from '../stores';
import { CharityVerificationTemplate } from 'themes/application/charity/bank-account-verification/components';

@setCurrentView((rootStore) => new CharityVerificationViewStore(rootStore), 'charityVerificationViewStore')
@observer
class CharityVerification extends React.Component {
    render() {
        return <CharityVerificationTemplate {...this.props} />
    }
}

export default CharityVerification;
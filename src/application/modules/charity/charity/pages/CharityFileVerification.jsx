import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityFileVerificationTemplate } from 'themes/application/charity/bank-account-verification/components';
import { CharityFileVerificationViewStore } from '../stores';

@setCurrentView((rootStore) => new CharityFileVerificationViewStore(rootStore), 'charityFileVerificationViewStore')
@observer
class CharityFileVerification extends React.Component {
    render() {
        return <CharityFileVerificationTemplate {...this.props} />
    }
}

export default CharityFileVerification;
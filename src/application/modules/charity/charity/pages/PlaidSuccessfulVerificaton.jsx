import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { PlaidSuccessfulVerificatonTemplate } from 'themes/application/charity/bank-account-verification/components';
import { PlaidSuccessfulVerificatonViewStore } from '../stores';

@setCurrentView((rootStore) => new PlaidSuccessfulVerificatonViewStore(rootStore), 'plaidSuccessfulVerificatonViewStore')
@observer
class PlaidSuccessfulVerificaton extends React.Component {
    render() {
        return <PlaidSuccessfulVerificatonTemplate {...this.props} />
    }
}

export default PlaidSuccessfulVerificaton;
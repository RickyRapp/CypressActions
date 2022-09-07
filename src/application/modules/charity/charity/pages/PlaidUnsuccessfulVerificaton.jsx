import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { PlaidUnsuccessfulVerificatonTemplate } from 'themes/application/charity/bank-account-verification/components';
import { PlaidUnsuccessfulVerificatonViewStore } from '../stores';

@setCurrentView((rootStore) => new PlaidUnsuccessfulVerificatonViewStore(rootStore), 'plaidUnsuccessfulVerificatonViewStore')
@observer
class PlaidUnsuccessfulVerificaton extends React.Component {
    render() {
        return <PlaidUnsuccessfulVerificatonTemplate {...this.props} />
    }
}

export default PlaidUnsuccessfulVerificaton;
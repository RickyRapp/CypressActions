import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import {  ManuallySucessMessageTemplate } from 'themes/application/charity/bank-account-verification/components';
import { ManuallySucessMessageViewStore } from '../stores';

@setCurrentView((rootStore) => new ManuallySucessMessageViewStore(rootStore), 'manuallySucessMessageViewStore')
@observer
class ManuallySucessMessage extends React.Component {
    render() {
        return <ManuallySucessMessageTemplate {...this.props} />
    }
}

export default ManuallySucessMessage;
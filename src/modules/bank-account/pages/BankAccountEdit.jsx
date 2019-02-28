import React from 'react';
import { observer } from 'mobx-react';
import { BankAccountEditTemplate } from 'themes/modules/bank-account/pages';

@observer
class BankAccountEdit extends React.Component {
    render() {
        return <BankAccountEditTemplate {...this.props} />
    }
}

export default BankAccountEdit;
import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityBankAccountTemplate } from 'themes/application/charity/charity/components';
import { CharityBankAccountViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore, props) => new CharityBankAccountViewStore(rootStore, props), 'charityBankAccountViewStore')
@observer
class CharityBankAccount extends React.Component {
    render() {
        return <CharityBankAccountTemplate {...this.props} />
    }
}

export default CharityBankAccount;

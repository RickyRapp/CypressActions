import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BankTabTemplate } from 'themes/application/administration/bank/pages';
import { BankTabViewStore } from 'application/administration/bank/stores';

@setCurrentView((rootStore) => new BankTabViewStore(rootStore), 'bankTabViewStore')
@observer
class BankTab extends React.Component {
    render() {
        return <BankTabTemplate {...this.props} />
    }
}

export default BankTab;

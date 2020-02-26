import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BankListTemplate } from 'themes/application/administration/bank/components';
import { BankViewStore } from 'application/administration/bank/stores';

@setCurrentView((rootStore) => new BankViewStore(rootStore), 'bankViewStore')
@observer
class BankList extends React.Component {
    render() {
        return <BankListTemplate {...this.props} />
    }
}

export default BankList;

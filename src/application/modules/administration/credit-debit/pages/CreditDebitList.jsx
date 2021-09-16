import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CreditDebitListTemplate } from 'themes/application/administration/credit-debit/pages';
import { CreditDebitViewStore } from 'application/administration/credit-debit/stores';

@setCurrentView((rootStore) => new CreditDebitViewStore(rootStore), 'creditDebitViewStore')
@observer
class CreditDebitList extends React.Component {
    render() {
        return <CreditDebitListTemplate {...this.props} />
    }
}

export default CreditDebitList; 

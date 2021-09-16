import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CreditDebitCreateTemplate } from 'themes/application/administration/credit-debit/pages';
import { CreditDebitCreateViewStore } from 'application/administration/credit-debit/stores';

@setCurrentView((rootStore) => new CreditDebitCreateViewStore(rootStore, { creditDebitStore: rootStore.application.administration.creditDebitStore, donorId: rootStore.routerStore.routerState.params.id }), 'creditDebitCreateViewStore')
@observer
class CreditDebitCreate extends React.Component {
    render() {
        return <CreditDebitCreateTemplate {...this.props} />
    }
}

export default CreditDebitCreate;

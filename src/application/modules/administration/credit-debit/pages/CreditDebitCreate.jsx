import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CreditDebitCreateTemplate } from 'themes/application/administration/credit-debit/pages';
import { CreditDebitViewStore } from 'application/administration/credit-debit/stores';

@setCurrentView((rootStore) => new CreditDebitViewStore(rootStore, { donorId: rootStore.routerStore.routerState.params.id, isDonor: false }), 'store')
@observer
class CreditDebitCreate extends React.Component {
    render() {
        return <CreditDebitCreateTemplate {...this.props} />
    }
}

export default CreditDebitCreate;

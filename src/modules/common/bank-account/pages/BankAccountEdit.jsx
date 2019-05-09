import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BankAccountEditTemplate } from 'themes/modules/common/bank-account/pages';
import { BankAccountEditViewStore } from 'modules/common/bank-account/stores';

@setCurrentView((rootStore, props) => new BankAccountEditViewStore(rootStore, { id: props.id, item: props.item, onAfterUpdate: props.onAfterUpdate }), 'bankAccountEditViewStore')
@observer
class BankAccountEdit extends React.Component {
    render() {
        return <BankAccountEditTemplate {...this.props} />
    }
}

export default BankAccountEdit;
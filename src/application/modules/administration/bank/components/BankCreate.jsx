import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { BankCreateTemplate } from 'themes/application/administration/bank/components';
import { BankCreateViewStore } from 'application/administration/bank/stores';

@setCurrentView((rootStore, props) => new BankCreateViewStore(rootStore, props.modalParams.data.id, props.modalParams.data.onAfterAction), 'bankCreateViewStore')
@observer
class BankCreate extends React.Component {
    render() {
        return <BankCreateTemplate {...this.props} />
    }
}

export default BankCreate;

import React from 'react';
import { observer } from 'mobx-react';
import { FundTransferCreateTemplate } from 'themes/modules/fund-transfer/pages';
import { setCurrentView } from 'core/utils';
import { FundTransferCreateViewStore } from 'modules/fund-transfer/stores';

@setCurrentView(rootStore => new FundTransferCreateViewStore(rootStore), 'fundTransferCreateViewStore')
@observer
class FundTransferCreate extends React.Component {
    render() {
        return <FundTransferCreateTemplate {...this.props} />;
    }
}

export default FundTransferCreate;
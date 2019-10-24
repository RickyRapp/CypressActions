import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { FundTransferCreateTemplate } from 'themes/application/fund-transfer/pages';
import { FundTransferCreateViewStore } from 'application/fund-transfer/stores';

@setCurrentView((rootStore) => new FundTransferCreateViewStore(rootStore), 'fundTransferCreateViewStore')
@observer
class FundTransferCreate extends React.Component {
    render() {
        return <FundTransferCreateTemplate {...this.props} />
    }
}

export default FundTransferCreate;

import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { FundTransferListTemplate } from 'themes/application/fund-transfer/pages';
import { FundTransferViewStore } from 'application/fund-transfer/stores';

@setCurrentView((rootStore) => new FundTransferViewStore(rootStore), 'fundTransferViewStore')
@observer
class FundTransferList extends React.Component {
    render() {
        return <FundTransferListTemplate {...this.props} />
    }
}

export default FundTransferList;

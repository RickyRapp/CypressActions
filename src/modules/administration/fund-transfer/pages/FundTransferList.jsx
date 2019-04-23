import React from 'react';
import { observer } from 'mobx-react';
import { FundTransferListTemplate } from 'themes/modules/administration/fund-transfer/pages';
import { setCurrentView } from 'core/utils';
import { FundTransferListViewStore } from 'modules/administration/fund-transfer/stores';

@setCurrentView(rootStore => new FundTransferListViewStore(rootStore), 'fundTransferListViewStore')
@observer
class FundTransferList extends React.Component {
    render() {
        return <FundTransferListTemplate {...this.props} />;
    }
}

export default FundTransferList;
import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { FundTransferListTemplate } from 'themes/application/activity/deposit/pages';
import { FundTransferViewStore } from 'application/activity/deposit/stores';

@setCurrentView((rootStore) => new FundTransferViewStore(rootStore), 'fundTransferViewStore')
@observer
class FundTransferList extends React.Component {
    render() {
        return <FundTransferListTemplate {...this.props} />
    }
}

export default FundTransferList;

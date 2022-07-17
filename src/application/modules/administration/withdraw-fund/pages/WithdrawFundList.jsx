import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { WithdrawFundViewStore } from '../stores';
import { WithdrawFundListTemplate } from 'themes/application/administration/withdraw-fund/pages';

@setCurrentView((rootStore) => new WithdrawFundViewStore(rootStore), 'withdrawFundViewStore')
@observer
class WithdrawFundList extends React.Component {
    render() {
        return <WithdrawFundListTemplate {...this.props} />
    }
}

export default WithdrawFundList;

import React, { Component } from 'react';
import { setCurrentView } from 'core/utils';
import { WithdrawFundCreateTemplate } from 'themes/application/administration/withdraw-fund/pages';
import { WithdrawFundCreateViewStore } from '../stores';

@setCurrentView((rootStore) => new WithdrawFundCreateViewStore(rootStore, { id: rootStore.routerStore.routerState.params.id}), 'withdrawFundCreateViewStore')
class WithdrawFundCreate extends Component {
    render() {
        return (
            <WithdrawFundCreateTemplate {...this.props} />
        )
    }
}

export default WithdrawFundCreate;

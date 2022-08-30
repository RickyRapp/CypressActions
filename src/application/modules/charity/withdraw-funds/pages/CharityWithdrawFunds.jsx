import React, { Component } from 'react';
import { setCurrentView } from 'core/utils';
import { CharityWithdrawFundsTemplate } from 'themes/application/charity/withdraw-funds/pages';
import { CharityWithdrawFundsViewStore } from '../stores';

@setCurrentView((rootStore) => new CharityWithdrawFundsViewStore(rootStore), 'charityWithdrawFundsViewStore')
class CharityWithdrawFunds extends Component {
    render() {
        return (
            <CharityWithdrawFundsTemplate {...this.props} />
        )
    }
}

export default CharityWithdrawFunds;

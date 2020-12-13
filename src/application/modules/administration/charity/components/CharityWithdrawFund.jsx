import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityWithdrawFundTemplate } from 'themes/application/administration/charity/components';
import { CharityWithdrawFundViewStore } from 'application/administration/charity/stores';

@setCurrentView((rootStore, props) => new CharityWithdrawFundViewStore(rootStore, props.modalParams.data), 'charityWithdrawFundViewStore')
@observer
class CharityWithdrawFund extends React.Component {
    render() {
        return <CharityWithdrawFundTemplate {...this.props} />
    }
}

export default CharityWithdrawFund;
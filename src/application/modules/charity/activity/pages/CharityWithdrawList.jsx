import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityWithdrawListTemplate } from 'themes/application/charity/activity/pages';
import { CharityWithdrawListViewStore } from '../stores';

@setCurrentView((rootStore) => new CharityWithdrawListViewStore(rootStore), 'charityWithdrawListViewStore')
@observer
class CharityWithdrawList extends React.Component {
    render() {
        return <CharityWithdrawListTemplate {...this.props} />
    }
}

export default CharityWithdrawList;

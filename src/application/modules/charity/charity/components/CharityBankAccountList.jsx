import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityBankAccountListTemplate } from 'themes/application/charity/charity/components';
import { CharityBankAccountListViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore) => new CharityBankAccountListViewStore(rootStore), 'charityBankAccountListViewStore')
@observer
class CharityBankAccountList extends React.Component {
    render() {
        return <CharityBankAccountListTemplate {...this.props} />
    }
}

export default CharityBankAccountList;

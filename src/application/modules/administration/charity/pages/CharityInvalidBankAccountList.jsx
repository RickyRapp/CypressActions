import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityInvalidBankAccountListTemplate } from 'themes/application/administration/charity/pages';
import { CharityInvalidBankAccountListViewStore } from '../stores';

@setCurrentView((rootStore) => new CharityInvalidBankAccountListViewStore(rootStore), 'charityInvalidBankAccountListViewStore')
@observer
class CharityInvalidBankAccountList extends React.Component {
    render() {
        return <CharityInvalidBankAccountListTemplate {...this.props} />
    }
}

export default CharityInvalidBankAccountList;

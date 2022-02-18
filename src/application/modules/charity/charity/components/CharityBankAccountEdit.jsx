import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityBankAccountEditTemplate } from 'themes/application/charity/charity/components';
import { CharityBankAccountEditViewStore } from 'application/charity/charity/stores';

@setCurrentView((rootStore, props) => new CharityBankAccountEditViewStore(rootStore, props), 'charityBankAccountEditViewStore')
@observer
class CharityBankAccountEdit extends React.Component {
    render() {
        return <CharityBankAccountEditTemplate {...this.props} />
    }
}

export default CharityBankAccountEdit;

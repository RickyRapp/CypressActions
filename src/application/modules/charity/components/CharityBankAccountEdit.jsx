import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityBankAccountEditTemplate } from 'themes/application/charity/components';
import { CharityBankAccountEditViewStore } from 'application/charity/stores';

@setCurrentView((rootStore, props) => new CharityBankAccountEditViewStore(rootStore, { id: props.id, charityId: props.charityId }), 'charityBankAccountEditViewStore')
@observer
class CharityBankAccountEdit extends React.Component {
    render() {
        return <CharityBankAccountEditTemplate {...this.props} />
    }
}

export default CharityBankAccountEdit;

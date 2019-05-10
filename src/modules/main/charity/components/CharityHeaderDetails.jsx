import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { CharityHeaderDetailsTemplate } from 'themes/modules/main/charity/components';
import { CharityHeaderDetailsViewStore } from 'modules/main/charity/stores';

@setCurrentView((rootStore, { userId, type }) => new CharityHeaderDetailsViewStore(rootStore, userId, type), 'charityHeaderDetailsViewStore')
@observer
class CharityHeaderDetails extends React.Component {
    render() {
        return <CharityHeaderDetailsTemplate {...this.props} />;
    }
}

export default CharityHeaderDetails;
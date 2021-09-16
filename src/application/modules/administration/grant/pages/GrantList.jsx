import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantListTemplate } from 'themes/application/administration/grant/pages';
import { GrantViewStore } from 'application/administration/grant/stores';

@setCurrentView((rootStore) => new GrantViewStore(rootStore), 'grantViewStore')
@observer
class GrantList extends React.Component {
    render() {
        return <GrantListTemplate {...this.props} />
    }
}

export default GrantList;

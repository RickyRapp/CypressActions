import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantEditTemplate } from 'themes/application/administration/grant/pages';
import { GrantEditViewStore } from 'application/administration/grant/stores';

@setCurrentView((rootStore) => new GrantEditViewStore(rootStore), 'grantEditViewStore')
@observer
class GrantEdit extends React.Component {
    render() {
        return <GrantEditTemplate {...this.props} />
    }
}

export default GrantEdit;

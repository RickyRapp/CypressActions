import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { GrantEditTemplate } from 'themes/application/donor/grant/pages';
import { GrantEditViewStore } from 'application/donor/grant/stores';

@setCurrentView((rootStore) => new GrantEditViewStore(rootStore), 'grantEditViewStore')
@observer
class GrantEdit extends React.Component {
    render() {
        return <GrantEditTemplate {...this.props} />
    }
}

export default GrantEdit;

import React from 'react';
import { PasswordChangeTemplate } from 'themes/platform/modules/membership/pages';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { PasswordChangeViewStore } from 'platform/modules/membership/stores';

@setCurrentView((rootStore) => new PasswordChangeViewStore(rootStore))
@observer
class PasswordChange extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <PasswordChangeTemplate {...this.props} />
    }
}

export default PasswordChange;

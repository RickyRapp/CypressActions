import React from 'react';
import { PasswordChangeTemplate } from 'themes/application/membership/pages';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { PasswordChangeViewStore } from 'application/common/membership/stores';

@setCurrentView((rootStore) => new PasswordChangeViewStore(rootStore), 'currentView')
@observer
export default class PasswordChange extends React.Component {
    render() {
        return <PasswordChangeTemplate {...this.props} />;
    }
}
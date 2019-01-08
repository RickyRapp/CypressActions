import React from 'react';
import { inject, observer } from 'mobx-react';
import { LoginTemplate } from 'themes/platform/modules/membership/pages';
import { setCurrentView } from 'core/utils';
import { LoginViewStore } from 'platform/modules/membership/stores';

@setCurrentView((rootStore) => new LoginViewStore(rootStore))
@observer
export default class Login extends React.Component {
    render() {
        return <LoginTemplate {...this.props} />
    }
}

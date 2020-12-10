import React from 'react';
import { observer } from 'mobx-react';
import { LoginTemplate } from 'themes/application/membership/pages';
import { setCurrentView } from 'core/utils';
import { LoginViewStore } from 'application/common/membership/stores';

@setCurrentView((rootStore) => new LoginViewStore(rootStore))
@observer
export default class Login extends React.Component {
    render() {
        return <LoginTemplate {...this.props} />
    }
}

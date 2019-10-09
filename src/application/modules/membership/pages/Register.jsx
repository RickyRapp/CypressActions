import React from 'react';
import { RegisterTemplate } from 'themes/application/membership/pages';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { RegisterViewStore } from 'application/membership/stores';

@setCurrentView((rootStore) => new RegisterViewStore(rootStore), 'viewStore')
@observer
class Register extends React.Component {
    render() {
        return <RegisterTemplate {...this.props} />
    }
}

export default Register;
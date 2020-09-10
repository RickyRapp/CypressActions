import React from 'react';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { RegisterTemplate } from 'themes/application/public/pages';
import { RegisterViewStore } from 'application/public/stores';

@setCurrentView((rootStore) => new RegisterViewStore(rootStore), 'registerViewStore')
@observer
class Register extends React.Component {
    render() {
        return <RegisterTemplate {...this.props} />
    }
}

export default Register;

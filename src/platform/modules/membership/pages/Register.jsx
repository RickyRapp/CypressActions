import React from 'react';
import { RegisterTemplate } from 'themes/platform/modules/membership/pages';
import { observer } from 'mobx-react';
import { setCurrentView } from 'core/utils';
import { RegisterViewStore } from 'platform/modules/membership/stores';

@setCurrentView((rootStore) => new RegisterViewStore(rootStore))
@observer
class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <RegisterTemplate {...this.props} />
    }
}

export default Register;
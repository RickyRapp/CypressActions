import React from 'react';
import { inject, observer } from 'mobx-react';
import { RegisterTemplate } from 'themes/modules/membership/pages';
import { setCurrentView } from 'core/utils';
import { RegisterViewStore } from 'modules/membership/stores';

@setCurrentView((rootStore) => new RegisterViewStore(rootStore))
@observer
export default class Register extends React.Component {
    render() {
        return <RegisterTemplate {...this.props} />
    }
}
import React from 'react';
import { inject, observer } from 'mobx-react';
import { ActivationConfirmTemplate } from 'themes/modules/membership/pages';

@inject((i) => ({
    viewStore: i.rootStore.app.membership.viewStore
}))
@observer
export default class ActivationConfirm extends React.Component {
    componentDidMount() {
        this.props.viewStore.registerView.handleActivation();
    }
    
    render() {
        return <ActivationConfirmTemplate {...this.props} />
    }
}
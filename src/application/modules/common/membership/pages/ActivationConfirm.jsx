import React from 'react';
import { observer } from 'mobx-react';
import { PropTypes } from 'prop-types';
import { RegisterViewStore } from 'application/common/membership/stores';
import { setCurrentView } from 'core/utils';
import { ActivationConfirmTemplate } from 'themes/application/membership/pages';

@setCurrentView((rootStore) => new RegisterViewStore(rootStore), 'viewStore')
@observer
export default class ActivationConfirm extends React.Component {
    componentDidMount() {
        this.props.viewStore.handleActivation();
    }

    render() {
        return <ActivationConfirmTemplate {...this.props} />
    }
}

ActivationConfirm.propTypes = {
    viewStore: PropTypes.object
};
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

import {BaasicFormControlsTemplate} from 'themes/components';

@observer
class BaasicFormControls extends Component {
    render() {
        return (
            <BaasicFormControlsTemplate {...this.props}/>
        )
    }
}

// const BaasicFormControls = function (props) {
//     return <BaasicFormControlsTemplate {...props} />
// };

BaasicFormControls.propTypes = {
    form: PropTypes.any.isRequired,
    validation: PropTypes.object,
    controls: PropTypes.any
};

export default BaasicFormControls;

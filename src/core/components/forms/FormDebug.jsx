import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {observer} from 'mobx-react';

@observer
class FormDebug extends Component {
    render() {
        return (
            <div>
                <span>errors: {JSON.stringify(this.props.form.errors())}</span><br/>
                <span>values: {JSON.stringify(this.props.form.values())}</span><br/>
                <span>{JSON.stringify({
                    touched: this.props.form.touched,
                    dirty: this.props.form.isDirty,
                    valid: this.props.form.isValid
                })}</span>
            </div>
        );
    }
}

FormDebug.propTypes = {
    form: PropTypes.object.isRequired
};

export default FormDebug;

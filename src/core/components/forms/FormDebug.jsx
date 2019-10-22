import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

@observer
class FormDebug extends Component {
    render() {
        return (
            <div className="card card--form card--primary card--med u-mar--bottom--med">
                <h3 className="u-mar--bottom--med">Errors</h3>
                <div className="row">
                    {JSON.stringify(this.props.form.errors())}
                </div>
                <h3 className="u-mar--bottom--med">Values</h3>
                <div className="row">
                    {JSON.stringify(this.props.form.values())}
                </div>
                <h3 className="u-mar--bottom--med">Properties</h3>
                <div className="row">
                    {JSON.stringify({
                        touched: this.props.form.touched,
                        dirty: this.props.form.isDirty,
                        valid: this.props.form.isValid
                    })}
                </div>
            </div>
        );
    }
}

FormDebug.propTypes = {
    form: PropTypes.object.isRequired
};

export default FormDebug;

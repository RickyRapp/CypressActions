import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import shouldRenderContentChildren from './shouldRenderContentChildren';

function EditFormContentTemplate({ form, children }) {
    return (
        <React.Fragment>
            {shouldRenderContentChildren(children) ? (
                children
            ) : (
                    <form className="fullheight u-mar--bottom--med" onSubmit={form.onSubmit}>{children ? <React.Fragment>{children}</React.Fragment> : null}</form>
                )}
        </React.Fragment>
    );
}

EditFormContentTemplate.propTypes = {
    form: PropTypes.object,
    children: PropTypes.any,
};

export default defaultTemplate(EditFormContentTemplate);

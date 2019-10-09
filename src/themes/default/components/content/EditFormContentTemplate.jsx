import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import shouldRenderContentChildren from './shouldRenderContentChildren';

function EditFormContentTemplate({ form, children }) {
    return (
        <React.Fragment>
            {shouldRenderContentChildren(children)
                ? children
                : (<form onSubmit={form.onSubmit} className='u-group'>
                    { children ? (
                        <div className='col col-sml-12 card card--form card--primary card--med'>
                            {children}
                        </div>
                        ) : null
                    }
                </form>
                )
            }
        </React.Fragment>
    )
}

EditFormContentTemplate.propTypes = {
    form: PropTypes.object,
    children: PropTypes.any
};

export default defaultTemplate(EditFormContentTemplate);
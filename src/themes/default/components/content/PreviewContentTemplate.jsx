import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import shouldRenderContentChildren from './shouldRenderContentChildren';

function PreviewContentTemplate({ children }) {
    return (
        <React.Fragment>
            {shouldRenderContentChildren(children)
                ? children
                : <div>{children}</div>
            }
        </React.Fragment>
    )
}

PreviewContentTemplate.propTypes = {
    children: PropTypes.any
};

export default defaultTemplate(PreviewContentTemplate);
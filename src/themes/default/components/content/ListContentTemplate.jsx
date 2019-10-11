import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';
import shouldRenderContentChildren from './shouldRenderContentChildren';

function ListContentTemplate({ children }) {
    return (
        <React.Fragment>
            {shouldRenderContentChildren(children)
                ? children
                : <div>{children}</div>
            }
        </React.Fragment>
    )
}

ListContentTemplate.propTypes = {
    children: PropTypes.any
};

export default defaultTemplate(ListContentTemplate);
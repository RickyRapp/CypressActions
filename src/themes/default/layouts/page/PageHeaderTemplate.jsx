import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function PageHeaderTemplate({ children, ...props }) {
    if (children) {
        const contentRender = typeof children === 'function' ? children(props) : children;
        if (contentRender) {
            return (
                <div className='content__header'>
                    <div>{contentRender}</div>
                </div>
            )
        }
    }
    
    return null;
}

PageHeaderTemplate.propTypes = {
    children: PropTypes.any
};

export default defaultTemplate(PageHeaderTemplate);

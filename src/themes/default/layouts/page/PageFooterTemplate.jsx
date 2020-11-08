import React from 'react';
import PropTypes from 'prop-types';
import { defaultTemplate } from 'core/hoc';

function PageFooterTemplate({ children, ...props }) {
    if (children) {
        const contentRender = typeof children === 'function' ? children(props) : children;
        if (contentRender) {
            return (
                <div className='content__footer u-padd--bottom--med'>
                    <div>{contentRender}</div>
                </div>
            )
        }
    }
    
    return null;
}

PageFooterTemplate.propTypes = {
    children: PropTypes.any
};

export default defaultTemplate(PageFooterTemplate);

import React from "react";
import { defaultTemplate } from 'core/utils';

function PageHeaderTemplate({ children, ...props }) {
    if (children) {
        const contentRender = typeof children === 'function' ? children(props) : children;
        if (contentRender) {
            return (
                <div className="content__header">
                    <div>{contentRender}</div>
                </div>
            )
        }
    }
    
    return null;
}

export default defaultTemplate(PageHeaderTemplate);

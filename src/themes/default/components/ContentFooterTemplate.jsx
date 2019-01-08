import React from "react";
import { defaultTemplate } from 'core/utils';

function ContentFooterTemplate({ content, ...props }) {
    return (
        <div className="page-footer">
            {content ? <div>{content(props)}</div> : null}
        </div>
    );
}

export default defaultTemplate(ContentFooterTemplate);

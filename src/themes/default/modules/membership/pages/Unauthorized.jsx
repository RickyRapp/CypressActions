import React from 'react';
import { defaultTemplate } from 'core/utils';

function UnauthorizedTemplate() {
    return (
        <div>You are not authorized to view this page.</div>
    )
}

export default defaultTemplate(UnauthorizedTemplate);
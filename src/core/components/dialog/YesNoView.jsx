import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { YesNoViewTemplate } from 'themes/components';

function YesNoView(props) {
    return <YesNoViewTemplate {...props} />
}

export default defaultTemplate(YesNoView);
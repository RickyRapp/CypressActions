import React from 'react';
import { BasicQueryInputTemplate } from 'themes/components';
import { defaultTemplate } from 'core/hoc';

function BasicQueryInput(props) {
    return <BasicQueryInputTemplate {...props} />
}

export default defaultTemplate(BasicQueryInput);
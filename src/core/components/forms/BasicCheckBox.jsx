import React from 'react';
import { BasicCheckBoxTemplate } from 'themes/components';
import { defaultTemplate } from 'core/utils';

function BasicCheckBox(props) {
    return <BasicCheckBoxTemplate {...props} />;
}

export default defaultTemplate(BasicCheckBox);

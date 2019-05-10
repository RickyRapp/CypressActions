import React from 'react';
import { BasicFormatFakeInputTemplate } from 'themes/components';
import { defaultTemplate } from 'core/utils';

function BasicFormatFakeInput(props) {
    return <BasicFormatFakeInputTemplate {...props} />;
}

export default defaultTemplate(BasicFormatFakeInput);

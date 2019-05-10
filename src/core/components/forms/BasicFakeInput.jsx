import React from 'react';
import { BasicFakeInputTemplate } from 'themes/components';
import { defaultTemplate } from 'core/utils';

function BasicFakeInput(props) {
    return <BasicFakeInputTemplate {...props} />;
}

export default defaultTemplate(BasicFakeInput);

import React from 'react';
import { BasicInputTemplate } from 'themes/components';
import { defaultTemplate } from "core/utils";

function BasicInput(props) {
    return <BasicInputTemplate {...props} />
}

export default defaultTemplate(BasicInput);
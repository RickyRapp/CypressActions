import React from 'react';
import Select from 'react-select';
import { defaultTemplate } from "core/utils";

function BaasicSelectTemplate(props) {
    return <Select {...props} />
}

export default defaultTemplate(BaasicSelectTemplate);
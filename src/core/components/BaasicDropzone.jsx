import React from 'react';
import {BaasicDropzoneTemplate} from 'themes/components';
import { defaultTemplate } from 'core/hoc';

function BaasicDropzone(props){
    return <BaasicDropzoneTemplate {...props}/>
}

export default defaultTemplate(BaasicDropzone);
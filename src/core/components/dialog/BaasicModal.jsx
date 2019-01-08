import React from 'react';
import { BaasicModalTemplate } from 'themes/components';
import { defaultTemplate } from "core/utils";

function BaasicModal(props) {
    return <BaasicModalTemplate {...props} />
}

export default defaultTemplate(BaasicModal);
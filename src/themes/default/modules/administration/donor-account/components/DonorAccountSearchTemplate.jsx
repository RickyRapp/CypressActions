import React from 'react';
import { defaultTemplate } from 'core/utils';
import { BaasicDropdown } from 'core/components';
import _ from 'lodash';

function DonorAccountSearchTemplate({ donorAccountSearchViewStore, children }) {
    const {
        donorAccountDropdownStore
    } = donorAccountSearchViewStore;

    return (
        <React.Fragment>
            <BaasicDropdown store={donorAccountDropdownStore} />
            {children &&
                <div>
                    {children}
                </div>}
        </React.Fragment>
    );
}

export default defaultTemplate(DonorAccountSearchTemplate);

import React from 'react';
import { defaultTemplate } from 'core/hoc';
import { BasicCheckbox } from 'core/components';

export default defaultTemplate(({ tableStore }) => {
    return (
        <BasicCheckbox
            id='headerCheckbox'
            checked={tableStore.globalCheck}
            onChange={e => {
                tableStore.setGlobalCheck(e.target.checked);
                tableStore.setSelectedItems(
                    e.target.checked ? [...tableStore.data] : []
                );
            }}
        />
    );
});
